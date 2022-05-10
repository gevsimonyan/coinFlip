// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.7;

contract CoinFlip {

	enum Status {PENDING, WON, LOSE}

	struct Game {
		address player;
		uint8 choice;
		uint256 betAmount;
		uint256 prize;
		uint256 result;
		Status status;
	}

	mapping(uint256 => Game) public games;

	address public owner;
	uint256 public gamesCount;
	uint256 public minBet = 0.01 ether;
	uint256 public maxBet = 10 ether;
	// amount * coeff / 100
	uint256 public coeff = 195;
	uint256 public profit;

	constructor() {
		owner = msg.sender;
	}

	modifier onlyOwner {
		require(msg.sender == owner, "CoinFlip: Only owner");
		_;
	}

	function setBetRange(uint256 _minBet, uint256 _maxBet) external onlyOwner {
		require(_maxBet > 0 && _minBet > 0, "Error");
		require(_maxBet > _minBet, "Error");
		minBet = _minBet;
		maxBet = _maxBet;
	} 

	function setCoeff(uint256 _coeff) external onlyOwner {
		require(_coeff > 100, "Error");
		coeff = _coeff;
	}

	function createGame(uint8 _choice) external payable {
		require(msg.value >= minBet && msg.value <= maxBet, "Error");
		require(_choice == 0 || _choice == 1, "Error");


		games[gamesCount] = Game(
			msg.sender,
			_choice,
			msg.value,
			0,
			0,
			Status.PENDING
		);

		gamesCount += 1;
	}

	function play(uint256 _id) external {
		Game storage game = games[_id];

		uint256 _result = block.timestamp % 2; 
		game.result = _result;

		if (game.choice == game.result) {
			uint256 _prize = game.betAmount * coeff / 100; // local
			game.prize = _prize;
			game.status = Status.WON;
			
			payable(game.player).transfer(_prize);
		} else {
			game.status = Status.LOSE;

			profit += game.betAmount;
		}
	}

	function withdraw(uint256 _amount) external onlyOwner {
		require(_amount <= address(this).balance, "Error");
		profit -= _amount;
		payable(msg.sender).transfer(_amount);
	}
}