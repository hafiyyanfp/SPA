let state = {
    hash: window.location.hash,
    inputValue: "",
  };
  
  function setState(newState) {
    state = { ...state, ...newState };
    render();
  }
  
  function Link(props) {
    const a = document.createElement("a");
    a.href = props.href;
    a.textContent = props.label;
    a.onclick = function (event) {
      event.preventDefault();
      const url = new URL(event.target.href);
      setState({ hash: url.hash });
      history.pushState(null, "", url.hash);
    };
    return a;
  }
  
  function Navbar() {
    const linkHome = Link({ href: "#home", label: "Home" });
    const linkAbout = Link({ href: "#about", label: "About" });
  
    const div = document.createElement("div");
    div.append(linkHome);
    div.append(linkAbout);
  
    return div;
  }
  
  function HomeScreen() {
    const navbar = Navbar();
  
    const p = document.createElement("p");
  
    const textPreview = document.createElement("p");
    textPreview.textContent = state.inputValue;
  
    const input = document.createElement("input");
    input.id = "input";
    input.value = state.inputValue;
    input.placeholder = "Enter Your Name";
    input.oninput = function (event) {
      setState({ inputValue: event.target.value });
    };
  
    const buttonClear = document.createElement("button");
    buttonClear.textContent = "Clear";
    buttonClear.onclick = function () {
      setState({ inputValue: "" });
    };
  
    const div = document.createElement("div");
    div.append(navbar);
    div.append(p);
    div.append(input);
    div.append(buttonClear);
    div.append(textPreview);
  
    return div;
  }
  
  function AboutScreen() {
    const linkHome = Link({ href: "#home", label: "Kembali Ke Home" });
  
    const p = document.createElement("p");
    p.textContent = "Welcome to About";
  
    const div = document.createElement("div");
    div.appendChild(linkHome);
    div.appendChild(p);
    return div;
  }
  
  function App() {
    const homeScreen = HomeScreen();
    const aboutScreen = AboutScreen();
  
    if (state.hash == "#home") {
      return homeScreen;
    } else if (state.hash == "#about") {
      return aboutScreen;
    } else {
      return homeScreen;
    }
  }
  
  function render() {
    const root = document.getElementById("root");
    const app = App();

    const focusedElementId = document.activeElement.id;
    const focusedElementSelectionStart = document.activeElement.selectionStart;
    const focusedElementSelectionEnd = document.activeElement.selectionEnd;
  
    root.innerHTML = "";
    root.appendChild(app);
  
    if (focusedElementId) {
      const focusedElement = document.getElementById(focusedElementId);
      focusedElement.focus();
      focusedElement.selectionStart = focusedElementSelectionStart;
      focusedElement.selectionEnd = focusedElementSelectionEnd;
    }
  }
  
  render();