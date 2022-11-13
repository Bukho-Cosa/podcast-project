import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { store, connect } from "../store.js";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class Component extends LitElement {
  static get properties() {
    return {
      previews: { state: true },
      sorting: { state: true },
      search: { state: true },
    };
  }

  constructor() {
    super();

    this.disconnectStore = connect((state) => {
      if (this.previews !== state.previews) {
        this.previews = state.previews;
      }
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
    .container {
      display: grid;
      width: 100%;
      grid-template-columns: 50% 50%; //this won't work
    }
    .innerDivs{
        border: 1px solid pink;
        margin: 1rem;
    }
    img {
      width: 300px;
      height: 300px;
      border-radius: 1rem;
    }
    img:hover {
      opacity: 0.33;
    }
    img:hover .centered{
        visibility: visible;
    }
    h5 {
      margin: 0;
      padding: 0;
    }
    button {
      border: none;
      width: 300px;
    }
    .centered {
      position: relative;
      bottom: 150px;
      width: 250px;
      font-weight: bold;
      visibility: hidden;
    }
  `;

  render() {
    /**
     * @type {import('../types').preview[]}
     */
    const previews = this.previews;

    const filteredPreviews = previews.filter((item) => {
      if (!this.search) return true;
      return item.title.toLowerCase().includes(this.search.toLowerCase());
    });

    const sortedPreviews = filteredPreviews.sort((a, b) => {
      if (this.sorting === "a-z") return a.title.localeCompare(b.title);
      if (this.sorting === "z-a") return b.title.localeCompare(a.title);

      const dateA = new Date(a.updated).getTime();
      const dateB = new Date(b.updated).getTime();

      if (this.sorting === "oldest-latest") return dateA - dateB;
      if (this.sorting === "latest-oldest") return dateB - dateA;

      throw new Error("Invalid sorting");
    });

    const list = sortedPreviews.map(({ title, id, updated, image, genres, seasons }) => {
      const date = new Date(updated);
      const day = date.getDate();
      const month = MONTHS[date.getMonth() - 1];
      const year = date.getFullYear();

      const clickHandler = () => store.loadSingle(id);

      const genreListEl = document.querySelector('#genreList');

    function showGenreText() {
      genreListEl.style.visibility = "visible";
    };
    function hideGenreText() {
      genreListEl.style.visibility = "hidden";
    }

      return html`
        <div >
          <div class="innerDivs">
            <img onmouseover="showGenreText()" onmouseout="hideGenreText()" id="image" src="${image}" alt="n/a" />
            <ul id="genreList" class="centered">
              <li>${genres}</li>
            </ul>
            <h5>Updated: ${day} ${month} ${year}</h5>
            <h5>No. of Seasons: ${seasons} </h5>
            <button @click="${clickHandler}">${title}</button>
          </div>
        </div>
      `;
    });


    return html`
      <h1>Podcast List</h1>
      <podcast-controls></podcast-controls>
      ${list.length > 0
        ? html`<div class="container">
            ${list}
      </div>`
        : html`<div>No matches</div>`}
    `;
  }
}

customElements.define("podcast-view-list", Component);
