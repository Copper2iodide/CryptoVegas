import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
import img from "./Images/jackpot.png";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success...Please do not refrest or exit the page" });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.011", "ether"),
    });

    this.setState({ message: "You have been entered!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success...Please do not refrest or exit the page" });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div>
        <h4>CryptoVegas</h4>
        <h1>CNY Jackpot</h1>
        <img src={img} alt="jackpot image" width="180" height="180"/>
        <h3>
          There are currently{" "}
          {this.state.players.length} people entered, competing to win
          <h1>
          {" "}
          {web3.utils.fromWei(this.state.balance, "ether")}
          </h1> ether!
        </h3>
        <p>(Winner will be picked on 5th Feb 2023)</p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <p>Want to try your luck?</p>
          <div>
            <label>Every entry is 0.011 eth</label>
          </div>
          <br></br>
          <button class="button-77">Enter</button>
        </form>

        <hr />
        <p>{this.state.message}</p>

        <button onClick={this.onClick} class="button-1">Admin</button>
        
      </div>
    );
  }
}
export default App;
