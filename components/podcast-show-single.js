/*I messed up the code somewhere and the page won't load so I've commented it all out*/

/*import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { store, connect } from "../store.js";

class Component extends LitElement {
  static get properties() {
    return {
      single: { state: true },
      sorting: { state: true },
      search: { state: true },
    };
  }

  constructor() {
    super();

    this.disconnectStore = connect((state) => {
      if (this.single === state.single) return 
      (this.single = state.single);
      if (this.sorting !== state.sorting) {
        this.sorting = state.sorting;
      }
      if (this.search !== state.search) {
        this.search = state.search;
      }
    });
  }

  disconnectedCallback() {
    this.disconnectStore();
  }

  static styles = css`
    h1 {
      color: purple;
    }

    .float {
      margin: 1rem;
      display: flex;
    }

    img {
      width: 300px;
      height: 300px;
    }

    p {
      margin-top: 5rem;
      margin-left: 1.5rem;
    }
  `;

  render() {
    /**
     * @type {import('../types').show}
     */
/*const show = this.single;
    if (!show) {
      return html`<div></div>`;
    }

    const backHandler = () => store.loadList();

   const filteredShows = show.filter((item) => {
      if (!this.search) return true;
      return item.title.toLowerCase().includes(this.search.toLowerCase());
    });

    const sortedShows = filteredShows.sort((a, b) => {
      const numberA = new Date(a.season);
      const numberB = new Date(b.season);

      if (this.sorting === "oldest-latest") return numberA - numberB;
      if (this.sorting === "latest-oldest") return numberB - numberA;

      throw new Error("Invalid sorting");
    });

    const seasons = sortedShows.seasons.map(({ episodes, title, season }) => {

        //const seasonNumber = season;
      return html`
        <div>
          <strong>${title}</strong>
          ${episodes.map(({ file, title: innerTitle }) => {
            return html`
              <div>
                <div>${innerTitle}</div>
                <audio controls>
                  <source
                    src="https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3"
                    type="audio/mp3"
                  />
                </audio>
              </div>
            `;
          })}
        </div>
      `;
    });

    return html`
      <button @click="${backHandler}">&#8592; BACK</button>
      <h1>${show.title || ""}</h1>
      <div class="float">
        <img src="${show.image}" />
        <p>${show.description}</p>
      </div>
      ${seasons}
    `;
  }
}

customElements.define("podcast-view-single", Component);*/

import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { store, connect } from "../store.js";

class Component extends LitElement {
  static get properties() {
    return {
      single: { state: true },
    };
  }

  constructor() {
    super();

    this.disconnectStore = connect((state) => {
      if (this.single === state.single) return;
      this.single = state.single;
    });
  }

  disconnectedCallback() {
    this.disconnectStore();
  }

  static styles = css`
    h1 {
      color: purple;
    }

    .float {
      margin: 1rem;
      display: flex;
    }

    img {
      width: 300px;
      height: 300px;
    }

    p {
      margin-top: 5rem;
      margin-left: 1.5rem;
    }
  `;
  render() {
    /**
     * @type {import('../types').show}
     */
    const show = this.single;
    if (!show) {
      return html`<div></div>`;
    }

    const backHandler = () => store.loadList();

    const seasons = show.seasons.map(({ episodes, title }) => {
      return html`
        <div>
          <strong>${title}</strong>
          ${episodes.map(({ file, title: innerTitle }) => {
            return html`
              <div>
                <div>${innerTitle}</div>
                <audio controls>
                  <source
                    src="https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3"
                    type="audio/mp3"
                  />
                </audio>
              </div>
            `;
          })}
        </div>
      `;
    });

    return html`
      <button @click="${backHandler}">&#8592; BACK</button>
      <div class="float">
        <img src="${show.image}" />
        <p>${show.description}</p>
      </div>
      <hr>
      ${seasons}
    `;
  }
}

customElements.define("podcast-view-single", Component);
