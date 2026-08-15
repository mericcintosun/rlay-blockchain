import { RlayHubLogo } from "../RlayHubLogo";
import type { Slide } from "./slides";

/** Brand rule: the logo sits bottom-right of every slide, colour flipped by theme. */
function Logo() {
  return <RlayHubLogo className="slide-logo" />;
}

export function SlideView({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "kapak":
      return (
        <section
          className={`slide kapak ${slide.theme === "dark" ? "dark on-ink" : "on-purple"}`}
        >
          <span className="dot dot-tl" />
          <span className="dot dot-br" />
          <span className="kapak-label">{slide.label}</span>
          <h1 className="kapak-title">{slide.title}</h1>
          <p className="kapak-sub">{slide.subtitle}</p>
          <Logo />
        </section>
      );

    case "cumle":
      return (
        <section className="slide cumle on-purple">
          <span className="dot dot-tl" />
          <span className="dot dot-br" />
          <p className="cumle-text">{slide.text}</p>
          <Logo />
        </section>
      );

    case "govde":
      return (
        <section className="slide govde">
          <span className="dot dot-soft" />
          <h2 className="slide-title">{slide.title}</h2>
          <div className="govde-body">
            {slide.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <Logo />
        </section>
      );

    case "kart":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="kart-grid">
            {slide.cards.map((card, i) => (
              <div className="kart" key={card.title}>
                <span className="kart-num">{i + 1}</span>
                <h3 className="kart-title">{card.title}</h3>
                <p className="kart-text">{card.text}</p>
              </div>
            ))}
          </div>
          <Logo />
        </section>
      );

    case "ikiSutun":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="sutun-grid">
            <div className="sutun light">
              <h3>{slide.left.title}</h3>
              <ul>
                {slide.left.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="sutun solid">
              <h3>{slide.right.title}</h3>
              <ul>
                {slide.right.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <Logo />
        </section>
      );

    case "adimlar":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="adim-row">
            {slide.steps.map((step, i) => (
              <div className={`adim ${i % 2 === 0 ? "solid" : "light"}`} key={step}>
                <span className="adim-num">{i + 1}</span>
                <span className="adim-text">{step}</span>
              </div>
            ))}
          </div>
          <Logo />
        </section>
      );

    case "liste":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <ol className="liste">
            {slide.items.map((item, i) => (
              <li key={item}>
                <span className="liste-num">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <Logo />
        </section>
      );

    case "rakam":
      return (
        <section className="slide rakam">
          <div className="rakam-value">{slide.value}</div>
          <p className="rakam-text">{slide.text}</p>
          <Logo />
        </section>
      );

    case "kod":
      return (
        <section className="slide">
          <h2 className="slide-title">{slide.title}</h2>
          <div className="kod-grid">
            <pre className="kod-block">
              <code>{slide.code}</code>
            </pre>
            <ul className="kod-notes">
              {slide.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <Logo />
        </section>
      );
  }
}
