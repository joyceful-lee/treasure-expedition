"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Coins,
  Compass,
  Flag,
  Gem,
  HelpCircle,
  LockKeyhole,
  LogOut,
  Map,
  Menu,
  PackageOpen,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  checkpoints,
  regions,
  TOTAL_CHECKPOINTS,
  pinStates,
  coinReward,
  treasures,
  rarityChances,
  stateFor,
  type Profile,
  type Progress,
  type Item,
  type Trade,
} from "@/lib/expedition";
import IslandMap from "./island-map";
import TreasureArt from "./treasure-art";
import CheckpointDetails from "./checkpoint-details";
import InteractiveChallenge from "./interactive-challenge";
type Tab = "map" | "collection" | "trades" | "leaderboard";
const paths: Record<Tab, string> = {
  map: "/",
  collection: "/collection",
  trades: "/trades",
  leaderboard: "/leaderboard",
};
type Ranking = { username: string; score: number; attempts: number };
async function api(url: string, body?: Record<string, unknown>) {
  const r = await fetch(
    url,
    body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : undefined,
  );
  const data = await r.json();
  if (!r.ok)
    throw new Error(
      data.error || "That action could not be saved; please try again.",
    );
  return data;
}
const navigation = [
  { id: "map" as const, label: "Expedition map", icon: Map },
  { id: "collection" as const, label: "My treasures", icon: Gem },
  { id: "trades" as const, label: "Trading post", icon: ArrowDownUp },
  { id: "leaderboard" as const, label: "Hall of explorers", icon: Trophy },
];
export default function Expedition({
  initialTab = "map",
}: {
  initialTab?: Tab;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [selected, setSelected] = useState(1);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [inventory, setInventory] = useState<Item[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(1);
  const [boardRevision, setBoardRevision] = useState(0);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [boardLoading, setBoardLoading] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [offered, setOffered] = useState("compass");
  const [requested, setRequested] = useState("scarab");
  const [packReward, setPackReward] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const completed = progress.filter((p) => p.completed_at).length;
  const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
  const cp = checkpoints[selected - 1];
  const status = stateFor(selected, progress);
  const nextAvailable = checkpoints.find((c) =>
    ["available", "attempted"].includes(stateFor(c.id, progress)),
  )?.id;
  const modal =
    detailsOpen || authOpen || puzzleOpen || helpOpen || !!packReward;
  const loadGame = useCallback(async () => {
    const [session, game] = await Promise.all([
      authClient.getSession(),
      api("/api/game"),
    ]);
    setSignedIn(!!session.data?.user);
    setProfile(game.profile);
    setProgress(game.progress);
    setInventory(game.inventory);
    return game;
  }, []);
  useEffect(() => {
    loadGame()
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [loadGame]);
  useEffect(() => {
    const onBack = () => {
      const entry = Object.entries(paths).find(
        ([, path]) => path === window.location.pathname,
      );
      setTab((entry?.[0] as Tab) ?? "map");
      setMobileNav(false);
    };
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);
  useEffect(() => {
    if (modal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modal]);
  const loadTrades = useCallback(async () => {
    setTrades(await api("/api/trades"));
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    async function refreshScores() {
      try {
        const response = await fetch(`/api/leaderboard?level=${level}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (active) setRankings(data);
      } catch (error) {
        if (
          active &&
          !(error instanceof DOMException && error.name === "AbortError")
        )
          setError(
            error instanceof Error
              ? error.message
              : "Scores could not refresh.",
          );
      } finally {
        if (active) setBoardLoading(false);
      }
    }
    function refreshVisible() {
      if (document.visibilityState === "visible") void refreshScores();
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    if (tab === "leaderboard") {
      setBoardLoading(true);
      setRankings([]);
      void refreshScores();
      timer = setInterval(refreshVisible, 15000);
      window.addEventListener("focus", refreshVisible);
      document.addEventListener("visibilitychange", refreshVisible);
    }
    if (tab === "trades") loadTrades().catch((e) => setError(e.message));
    return () => {
      active = false;
      controller.abort();
      clearInterval(timer);
      window.removeEventListener("focus", refreshVisible);
      document.removeEventListener("visibilitychange", refreshVisible);
    };
  }, [tab, level, loadTrades, boardRevision]);
  function inspectCheckpoint(id: number) {
    setSelected(id);
    setDetailsOpen(true);
    setPuzzleOpen(false);
    setAnswer("");
    setHint(false);
    setMessage("");
    setError("");
  }
  function closeModal() {
    setDetailsOpen(false);
    setAuthOpen(false);
    setPuzzleOpen(false);
    setHelpOpen(false);
    setPackReward(null);
    setMessage("");
    setError("");
  }
  function navigate(next: Tab) {
    if (window.location.pathname !== paths[next])
      window.history.pushState(null, "", paths[next]);
    setTab(next);
    setMobileNav(false);
    setMessage("");
    setError("");
  }
  function requireProfile() {
    if (!profile) {
      setSignUp(!signedIn);
      setAuthOpen(true);
      return false;
    }
    return true;
  }
  async function run(action: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await action();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await run(async () => {
      const username = String(data.get("username") || "");
      if (!signedIn) {
        const params = {
          email: String(data.get("email")),
          password: String(data.get("password")),
          name: username,
        };
        const result = signUp
          ? await authClient.signUp.email(params)
          : await authClient.signIn.email(params);
        if (result.error)
          throw new Error(result.error.message || "Could not log in.");
        const session = await authClient.getSession();
        if (!session.data?.user) {
          setMessage("Check your email to verify your account, then log in.");
          return;
        }
        setSignedIn(true);
      }
      const game = await loadGame();
      if (!game.profile) {
        if (!username) {
          setMessage("One last step: choose your explorer name.");
          return;
        }
        await api("/api/game", { action: "profile", username });
        await loadGame();
      }
      setAuthOpen(false);
      setMessage(
        "Your explorer account is ready, and your progress will be saved as you continue.",
      );
    });
  }
  async function submitAnswer(event: React.FormEvent) {
    event.preventDefault();
    await run(async () => {
      const result = await api("/api/game", {
        action: "answer",
        checkpoint: selected,
        answer,
      });
      await loadGame();
      if (result.completed) {
        setLevel(selected);
        setBoardRevision((v) => v + 1);
        setMessage(
          result.alreadyCompleted
            ? "You already discovered this treasure."
            : `Checkpoint complete! +${result.score} points, +${result.coins} coins, and a new treasure.`,
        );
      } else
        setMessage(
          "That answer does not fit the clue yet; you can try again or open the hint.",
        );
    });
  }
  async function openPack() {
    if (!requireProfile()) return;
    await run(async () => {
      const data = await api("/api/game", { action: "pack" });
      await loadGame();
      setPackReward(data.reward);
    });
  }
  async function tradeAction(action: string, id?: string) {
    if (!requireProfile()) return;
    await run(async () => {
      await api("/api/game", { action, id, offered, requested });
      await Promise.all([loadGame(), loadTrades()]);
      setMessage(
        action === "trade"
          ? "Trade posted! Your offered treasure is reserved."
          : action === "cancel"
            ? "Your trade has been cancelled and the treasure returned to your collection."
            : "Trade complete! Check your collection.",
      );
    });
  }
  function startPuzzle() {
    setDetailsOpen(false);
    if (status === "locked") return;
    if (!requireProfile()) return;
    setAnswer("");
    setHint(false);
    setMessage("");
    setError("");
    setPuzzleOpen(true);
  }
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <a href="/" className="brand">
          <span className="brand-mark">
            <Compass size={29} strokeWidth={1.5} />
          </span>
          <span>
            Treasure<span>Expedition</span>
          </span>
        </a>
        <div className="sidebar-caption">FIELD JOURNAL / VOL. I</div>
        <nav aria-label="Main navigation">
          {navigation.map((n) => (
            <button
              key={n.id}
              className={`nav-item ${tab === n.id ? "active" : ""}`}
              onClick={() => navigate(n.id)}
            >
              <n.icon size={19} />
              <span>{n.label}</span>
              {tab === n.id ? <ChevronRight size={15} /> : null}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <TreasureArt kind="compass" className="journal-drawing" />
          <span className="note-line" />
        </div>
        <button
          className="help-link"
          onClick={() => {
            setError("");
            setHelpOpen(true);
          }}
        >
          <HelpCircle size={18} /> Explorer’s guide <ChevronRight size={14} />
        </button>
        <div className="sidebar-user">
          <span className="avatar">
            {profile ? (
              profile.username.slice(0, 1).toUpperCase()
            ) : (
              <Compass size={20} />
            )}
          </span>
          <div>
            <strong>{profile?.username || "New explorer"}</strong>
            <small>
              {profile ? "Expedition in progress" : "Not signed in"}
            </small>
          </div>
          {signedIn ? (
            <button
              className="icon-button"
              aria-label="Log out"
              onClick={() =>
                run(async () => {
                  await authClient.signOut();
                  await loadGame();
                })
              }
            >
              <LogOut size={17} />
            </button>
          ) : null}
        </div>
      </aside>
      <main>
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileNav(!mobileNav)}
              aria-label="Toggle navigation"
            >
              <Menu size={22} />
            </button>
            <span>The explorer’s journal</span>
            <ChevronRight size={13} />
            <strong>{navigation.find((n) => n.id === tab)?.label}</strong>
          </div>
          <div className="top-actions">
            <span className="coin-count">
              <Coins size={17} />
              {profile?.coins ?? 0}
              <span> coins</span>
            </span>
            {!profile ? (
              <button
                className="button small"
                onClick={() => {
                  setSignUp(!signedIn);
                  setAuthOpen(true);
                }}
              >
                {signedIn ? "Choose explorer name" : "Sign up or log in"}
                <ArrowRight size={15} />
              </button>
            ) : (
              <span className="explorer-tag">
                <span className="online-dot" /> Explorer
              </span>
            )}
          </div>
        </header>
        <div className="page-content">
          {!modal && error ? (
            <div className="notice error" role="alert">
              {error}
              <button onClick={() => setError("")} aria-label="Dismiss error">
                <X size={16} />
              </button>
            </div>
          ) : null}
          {!modal && message ? (
            <div className="notice" role="status">
              {message}
            </div>
          ) : null}
          {tab === "map" ? (
            <>
              <section className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span /> THE ISLAND SURVEY
                  </div>
                  <h1>Beyond the southern shore</h1>
                  <p>
                    Follow the trail inland as each solved clue reveals another
                    stretch of the island.
                  </p>
                </div>
                <button
                  className="outline-button guide-button"
                  onClick={() => setHelpOpen(true)}
                >
                  <BookOpen size={16} /> How to play
                </button>
              </section>
              <section className="stats-row" aria-label="Expedition stats">
                <div className="stat">
                  <span className="stat-icon sand">
                    <Flag size={20} />
                  </span>
                  <div>
                    <span>Checkpoints completed</span>
                    <strong>
                      {completed}
                      <small> / {TOTAL_CHECKPOINTS}</small>
                    </strong>
                  </div>
                  <span className="stat-detail">
                    {completed === TOTAL_CHECKPOINTS
                      ? "Island explored!"
                      : "Your journey so far"}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-icon sage">
                    <Gem size={20} />
                  </span>
                  <div>
                    <span>Treasures collected</span>
                    <strong>
                      {inventory.reduce((n, i) => n + i.quantity, 0)}
                      <small> treasures</small>
                    </strong>
                  </div>
                  <span className="stat-detail">
                    Recorded in your collection
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-icon lavender">
                    <Trophy size={20} />
                  </span>
                  <div>
                    <span>Expedition score</span>
                    <strong>
                      {totalScore.toLocaleString()}
                      <small> pts</small>
                    </strong>
                  </div>
                  <button
                    className="stat-link"
                    onClick={() => navigate("leaderboard")}
                  >
                    View leaderboard <ArrowRight size={13} />
                  </button>
                </div>
              </section>
              <section className="map-card">
                <div className="map-card-header">
                  <div className="map-title">
                    <span className="chapter">01</span>
                    <div>
                      <h2>Chart of the Lost Island</h2>
                      <p>
                        Follow 60 checkpoints through six regions, from the
                        landing to the northern treasury.
                      </p>
                    </div>
                  </div>
                </div>
                <IslandMap
                  progress={progress}
                  selected={selected}
                  onSelect={inspectCheckpoint}
                />
                <div className="map-footer">
                  <div className="legend">
                    {pinStates.map((state) => (
                      <span key={state.id}>
                        <i
                          className={state.id}
                          style={{ backgroundColor: state.color }}
                        />{" "}
                        {state.label}
                      </span>
                    ))}
                  </div>
                  <span>
                    <LockKeyhole size={13} /> Solve a checkpoint to unlock the
                    next
                  </span>
                </div>
              </section>
            </>
          ) : null}
          {tab === "collection" ? (
            <>
              <PageHeading
                eyebrow="ARTIFACT REGISTER"
                title="The specimen cabinet"
                text="Your recovered artifacts are catalogued here, where you can keep them or set aside duplicates for a trade."
              />
              <div className="pack-banner">
                <div className="pack-icon">
                  <TreasureArt kind="satchel" />
                </div>
                <div>
                  <span className="eyebrow">THE EXPLORER’S SATCHEL</span>
                  <h2>The sealed field satchel</h2>
                  <p>
                    A satchel draws one of 24 artifacts and costs 100 coins
                    earned from solving clues. Both packs and completed
                    checkpoints use the same chances. Duplicates can be traded,
                    and completing the route does not guarantee the full
                    collection.
                  </p>
                  <details>
                    <summary>See drop chances</summary>
                    <p>
                      {rarityChances
                        .map((r) => `${r.rarity} ${r.chance}%`)
                        .join(" · ")}
                    </p>
                  </details>
                </div>
                <button
                  className="button"
                  disabled={busy || (!!profile && profile.coins < 100)}
                  onClick={openPack}
                >
                  <PackageOpen size={17} /> Open pack · 100 coins
                </button>
              </div>
              <div className="section-label">
                <h2>Your collection</h2>
                <span>
                  {inventory.filter((i) => i.quantity > 0).length} of{" "}
                  {treasures.length}{" "}
                  discovered
                </span>
              </div>
              <div className="treasure-grid">
                {treasures.map((t, index) => {
                  const quantity =
                    inventory.find((i) => i.treasure_id === t.id)?.quantity ??
                    0;
                  return (
                    <article
                      key={t.id}
                      className={`treasure-card ${quantity ? "owned" : "undiscovered"}`}
                      data-specimen={String(index + 1).padStart(2, "0")}
                    >
                      <span className={`rarity ${t.rarity.toLowerCase()}`}>
                        {t.rarity}
                      </span>
                      <div className="treasure-illustration">
                        <TreasureArt kind={t.id} />
                      </div>
                      <h3>{t.name}</h3>
                      <p>{t.description}</p>
                      <small className="artifact-chance">
                        {t.weight / 4}% chance per draw
                      </small>
                      <div className="treasure-bottom">
                        <span>
                          {quantity
                            ? `${quantity} in your collection`
                            : "Waiting to be discovered"}
                        </span>
                        {quantity ? <Check size={16} /> : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : null}
          {tab === "leaderboard" ? (
            <>
              <PageHeading
                eyebrow="EXPEDITION RECORDS"
                title="The explorers’ register"
                text="The register records the ten highest scores for each checkpoint, with earlier discoveries breaking a tie."
              />
              <div className="board-layout">
                <section className="panel leaderboard">
                  <div className="panel-header">
                    <h2>
                      <Trophy size={20} /> High scores
                    </h2>
                    <label className="level-select">
                      <span className="sr-only">Checkpoint</span>
                      <select
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                      >
                        {regions.map((region, index) => (
                          <optgroup
                            key={region.name}
                            label={`${region.name} · ${region.theme}`}
                          >
                            {checkpoints
                              .filter((c) => c.region === index)
                              .map((c) => (
                                <option key={c.id} value={c.id}>
                                  {String(c.id).padStart(2, "0")} · {c.name}
                                </option>
                              ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronDown size={14} />
                    </label>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Explorer</th>
                        <th>Attempts</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!boardLoading
                        ? rankings.map((r, i) => (
                            <tr key={r.username}>
                              <td>
                                <span className={`rank rank-${i + 1}`}>
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              </td>
                              <td>
                                <span className="table-avatar">
                                  {r.username[0].toUpperCase()}
                                </span>
                                {r.username}
                              </td>
                              <td>{r.attempts}</td>
                              <td>
                                <strong>{r.score.toLocaleString()}</strong> pts
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                  {boardLoading ? (
                    <div className="empty-state">
                      Unrolling the record scroll…
                    </div>
                  ) : !rankings.length ? (
                    <div className="empty-state">
                      <Trophy size={38} strokeWidth={1} />
                      <h3>No scores have been recorded yet</h3>
                      <p>
                        Complete this checkpoint while signed in to add your
                        score to the register.
                      </p>
                      <button
                        className="button"
                        onClick={() => {
                          setSelected(level);
                          navigate("map");
                        }}
                      >
                        Explore the map <ArrowRight size={15} />
                      </button>
                    </div>
                  ) : null}
                </section>
                <aside className="panel scoring-note">
                  <div className="register-illustration">
                    <TreasureArt kind="seal" />
                  </div>
                  <h2>How the register works</h2>
                  <p>Complete a checkpoint to appear on its leaderboard.</p>
                  <ul>
                    <li>
                      Scores increase within each region, with a 1,000-point
                      bonus for every tenth checkpoint.
                    </li>
                    <li>
                      Each incorrect answer takes off 25 points, down to a
                      minimum of 100.
                    </li>
                    <li>
                      When scores are tied, the earlier discovery is listed
                      first.
                    </li>
                    <li>
                      Each checkpoint records your score on its first successful
                      solve.
                    </li>
                  </ul>
                  <p>
                    The public register shows your explorer name while keeping
                    your email private.
                  </p>
                  {!profile ? (
                    <button
                      className="button"
                      onClick={() => {
                        setSignUp(!signedIn);
                        setAuthOpen(true);
                      }}
                    >
                      Create an explorer account <ArrowRight size={15} />
                    </button>
                  ) : null}
                </aside>
              </div>
            </>
          ) : null}
          {tab === "trades" ? (
            <>
              <PageHeading
                eyebrow="EXCHANGE LEDGER"
                title="The trading post"
                text="Browse other explorers’ offers or exchange a duplicate for an artifact missing from your cabinet."
              />
              <section className="panel trade-form">
                <div>
                  <h2>Record an offer</h2>
                  <p>
                    The artifact you offer is reserved until another explorer
                    accepts the exchange or you cancel it.
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    tradeAction("trade");
                  }}
                >
                  <label>
                    You offer
                    <select
                      value={offered}
                      onChange={(e) => setOffered(e.target.value)}
                    >
                      {treasures.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} (
                          {inventory.find((i) => i.treasure_id === t.id)
                            ?.quantity ?? 0}
                          )
                        </option>
                      ))}
                    </select>
                  </label>
                  <ArrowRight size={19} />
                  <label>
                    You’re looking for
                    <select
                      value={requested}
                      onChange={(e) => setRequested(e.target.value)}
                    >
                      {treasures.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="button"
                    disabled={busy || (!!profile && offered === requested)}
                  >
                    Post trade <ArrowRight size={16} />
                  </button>
                </form>
              </section>
              <div className="section-label">
                <h2>Offers from the island</h2>
                <button className="text-button" onClick={() => run(loadTrades)}>
                  Refresh offers
                </button>
              </div>
              <div className="trade-grid">
                {trades.map((t) => {
                  const offer = treasures.find((x) => x.id === t.offered)!;
                  const want = treasures.find((x) => x.id === t.requested)!;
                  return (
                    <article key={t.id} className="panel trade-card">
                      <span className="eyebrow">{t.username} IS TRADING</span>
                      <div className="trade-items">
                        <div>
                          <TreasureArt kind={offer.id} />
                          <strong>{offer.name}</strong>
                        </div>
                        <ArrowDownUp size={20} />
                        <div>
                          <TreasureArt kind={want.id} />
                          <strong>{want.name}</strong>
                        </div>
                      </div>
                      <button
                        className={
                          profile?.id === t.maker_id
                            ? "outline-button"
                            : "button"
                        }
                        disabled={busy}
                        onClick={() =>
                          tradeAction(
                            profile?.id === t.maker_id ? "cancel" : "accept",
                            t.id,
                          )
                        }
                      >
                        {profile?.id === t.maker_id
                          ? "Cancel my offer"
                          : "Accept trade"}
                        <ArrowRight size={15} />
                      </button>
                    </article>
                  );
                })}
              </div>
              {!trades.length ? (
                <div className="empty-state panel">
                  <ArrowDownUp size={36} strokeWidth={1} />
                  <h3>A quiet day at the trading post.</h3>
                  <p>Collect a treasure and post the island’s first offer.</p>
                </div>
              ) : null}
            </>
          ) : null}
          <footer className="page-footer">
            <span>Island survey · Edition I</span>
            <span>Progress is saved to your explorer account.</span>
          </footer>
        </div>
      </main>
      <dialog
        ref={dialogRef}
        className="modal"
        aria-label={
          detailsOpen || puzzleOpen
            ? `Checkpoint ${selected}: ${cp.name}`
            : authOpen
              ? "Explorer account"
              : helpOpen
                ? "How to play"
                : "Treasure discovery"
        }
        onCancel={closeModal}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal-inner">
          <button
            className="modal-close icon-button"
            onClick={closeModal}
            aria-label="Close dialog"
          >
            <X size={21} />
          </button>
          {detailsOpen ? (
            <CheckpointDetails
              checkpoint={cp}
              status={status}
              progress={progress}
              loading={loading}
              onStart={startPuzzle}
              nextAvailable={nextAvailable}
              onNextAvailable={() =>
                nextAvailable && inspectCheckpoint(nextAvailable)
              }
            />
          ) : null}
          {authOpen ? (
            <>
              <div className="modal-symbol">
                <Compass size={34} />
              </div>
              <div className="eyebrow">EXPLORER ACCOUNT</div>
              <h2>
                {signedIn
                  ? "Choose your explorer name"
                  : signUp
                    ? "Sign up or log in."
                    : "Welcome back, explorer."}
              </h2>
              <p>
                {signedIn
                  ? "Choose a nickname that you are comfortable displaying on leaderboards and trade offers."
                  : "An explorer account keeps your progress, recovered artifacts, and scores together."}
              </p>
              <form className="auth-form" onSubmit={authenticate}>
                {signUp || signedIn ? (
                  <label>
                    Explorer name
                    <input
                      name="username"
                      required
                      pattern="[a-zA-Z0-9_]{3,20}"
                      minLength={3}
                      maxLength={20}
                      placeholder="e.g. CompassKid"
                      autoComplete="nickname"
                    />
                    <small>
                      Your nickname can use 3–20 letters, numbers, or
                      underscores.
                    </small>
                  </label>
                ) : null}
                {!signedIn ? (
                  <>
                    <label>
                      Email
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                      />
                    </label>
                    <label>
                      Password
                      <input
                        name="password"
                        type="password"
                        autoComplete={
                          signUp ? "new-password" : "current-password"
                        }
                        minLength={8}
                        maxLength={128}
                        required
                        placeholder="At least 8 characters"
                      />
                    </label>
                  </>
                ) : null}
                <button className="button" disabled={busy}>
                  {busy
                    ? "Getting your journal ready…"
                    : signedIn
                      ? "Save explorer name"
                      : signUp
                        ? "Create my account"
                        : "Log in"}
                  <ArrowRight size={16} />
                </button>
              </form>
              {!signedIn ? (
                <button
                  className="auth-switch"
                  onClick={() => {
                    setSignUp(!signUp);
                    setError("");
                    setMessage("");
                  }}
                >
                  {signUp
                    ? "Already an explorer? Log in"
                    : "New to the island? Create an account"}
                </button>
              ) : null}
            </>
          ) : null}
          {puzzleOpen ? (
            <>
              <span className="eyebrow">
                CHECKPOINT {String(selected).padStart(2, "0")} ·{" "}
                {cp.difficulty.toUpperCase()}
              </span>
              <h2>{cp.name}</h2>
              <p>{cp.subtitle}</p>
              <div className="puzzle-clue">
                <span className="eyebrow">{cp.kind}</span>
                <p>{cp.prompt}</p>
              </div>
              {status === "completed" ? (
                <div className="discovery-result">
                  <TreasureArt
                    kind={
                      progress.find((p) => p.checkpoint === selected)
                        ?.treasure_id ?? cp.reward
                    }
                  />
                  <h3>
                    {
                      treasures.find(
                        (t) =>
                          t.id ===
                          (progress.find((p) => p.checkpoint === selected)
                            ?.treasure_id ?? cp.reward),
                      )?.name
                    }{" "}
                    discovered
                  </h3>
                  <p>
                    {progress.find((p) => p.checkpoint === selected)?.score}{" "}
                    points saved to your journal and this checkpoint’s
                    leaderboard.
                  </p>
                  <button
                    className="text-button"
                    onClick={() => {
                      setLevel(selected);
                      setBoardRevision((v) => v + 1);
                      closeModal();
                      navigate("leaderboard");
                    }}
                  >
                    View this checkpoint’s high scores
                  </button>
                  {selected < TOTAL_CHECKPOINTS ? (
                    <button
                      className="button"
                      onClick={() => {
                        inspectCheckpoint(selected + 1);
                        setAnswer("");
                        setHint(false);
                        setMessage("");
                      }}
                    >
                      Next checkpoint <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        closeModal();
                        navigate("collection");
                      }}
                    >
                      See my treasures <Gem size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <form className="answer-form" onSubmit={submitAnswer}>
                    {cp.challenge ? (
                      <InteractiveChallenge
                        key={cp.id}
                        checkpoint={cp}
                        onAnswer={setAnswer}
                        disabled={busy}
                      />
                    ) : (
                      <>
                        {" "}
                        <label>
                          Your answer
                          <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            maxLength={200}
                            required
                            placeholder="Follow your curiosity…"
                            autoComplete="off"
                          />
                        </label>
                      </>
                    )}
                    <button
                      className="button"
                      disabled={busy || !answer.trim()}
                    >
                      {busy ? "Checking the clue…" : "Check answer"}
                      <ArrowRight size={16} />
                    </button>
                  </form>
                  <button
                    className="text-button hint-button"
                    onClick={() => setHint(!hint)}
                  >
                    <HelpCircle size={15} />
                    {hint ? "Hide hint" : "Show a hint"}
                  </button>
                  {hint ? <p className="hint">{cp.hint}</p> : null}
                  <small className="puzzle-footnote">
                    A correct answer draws one random artifact and{" "}
                    {coinReward(cp.id)} coins. Each incorrect attempt subtracts
                    25 score points.
                  </small>
                </>
              )}
            </>
          ) : null}
          {helpOpen ? (
            <>
              <span className="eyebrow">THE EXPLORER’S GUIDE</span>
              <h2>Reading the field journal</h2>
              <div className="guide-steps">
                <div>
                  <span>01</span>
                  <section>
                    <h3>Your explorer account</h3>
                    <p>
                      When you sign up and choose an explorer nickname, your
                      discoveries are saved as you travel across the island.
                    </p>
                  </section>
                </div>
                <div>
                  <span>02</span>
                  <section>
                    <h3>Following the route</h3>
                    <p>
                      Each region contains nine themed puzzles and a major
                      interactive challenge. Follow all 60 numbered pins in
                      order, selecting any pin to read its details.
                    </p>
                  </section>
                </div>
                <div>
                  <span>03</span>
                  <section>
                    <h3>Recording your discoveries</h3>
                    <p>
                      Each checkpoint rewards your first successful solve with a
                      treasure and 100 coins, while major challenges earn 300
                      coins. Spend your coins on sealed satchels and keep
                      duplicates for the trading post.
                    </p>
                  </section>
                </div>
                <div>
                  <span>04</span>
                  <section>
                    <h3>Adding a score to the register</h3>
                    <p>
                      The ten highest scores for each checkpoint appear in the
                      public register, where fewer incorrect attempts earn more
                      points and hints carry no penalty.
                    </p>
                  </section>
                </div>
              </div>
              <button className="button" onClick={closeModal}>
                Return to the map <ArrowRight size={16} />
              </button>
            </>
          ) : null}
          {packReward
            ? (() => {
                const t = treasures.find((t) => t.id === packReward)!;
                return (
                  <div className="pack-reveal">
                    <span className="eyebrow">A NEW DISCOVERY</span>
                    <div className="reveal-illustration">
                      <TreasureArt kind={t.id} />
                    </div>
                    <span className={`rarity ${t.rarity.toLowerCase()}`}>
                      {t.rarity}
                    </span>
                    <h2>{t.name}</h2>
                    <p>{t.description}</p>
                    <p>Added to your treasure collection.</p>
                    <button className="button" onClick={closeModal}>
                      Keep exploring <ArrowRight size={16} />
                    </button>
                  </div>
                );
              })()
            : null}
          {error ? (
            <div className="notice error" role="alert">
              {error}
            </div>
          ) : null}
          {message ? (
            <div className="notice" role="status">
              {message}
            </div>
          ) : null}
        </div>
      </dialog>
    </div>
  );
}
function PageHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-heading">
      <div>
        <div className="eyebrow">
          <span />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
