// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ArticlesContract110 is ERC721 {
    // Define an owner address
    address payable public manager;

    // A counter to generate unique article IDs
    uint256 public articleCount;

    // A struct to store the article and its owner
    struct Article {
        uint256 id;
        string content;
        address owner;
        string tags; // comma separated
        uint256 created;
        uint amount;
        bool exchangeable; // a flag to indicate if the article can be exchanged
    }

    // A mapping from article ID to Article struct
    mapping(uint256 => Article) public articles;

    // An event to emit when an article is created
    event ArticleCreated(uint256 indexed articleId, string content, address indexed owner, uint amount);

    // An event to emit when an article is exchanged
    event ArticleSold(uint256 indexed articleId, address indexed oldOwner);

    // An event to emit when an article is changed
    event ArticleExchangeable(uint256 indexed articleId, bool newExchangeable);

    // A modifier to check if the caller is the owner of an article
    modifier onlyOwner(uint256 _articleId) {
        require(articles[_articleId].owner == msg.sender, "You are not the owner of this article");
        _;
    }

    // A constructor to initialize the ERC-721 contract with a name and a symbol
    constructor() ERC721("Articles", "ART") {
        manager = payable(msg.sender); // set the owner to be the deployer of the contract
    }

    // Define a function to withdraw the ether collected by the contract to the owner address
    function withdraw() public {
        require(msg.sender == manager, "Only owner can withdraw"); // check if the caller is the owner
        manager.transfer(address(this).balance); // send all the ether in the contract to the owner
    }

    // A function to create a new article and assign it to the caller (minting)
    function createArticle(string memory _content, string memory _tags, uint _amount) public payable {
        // Increment the article count
        articleCount++;

        // Local variable tokenId
        uint256 tokenId = articleCount;

        // Create a new article struct with the given content and the caller as the owner
        Article memory newArticle = Article({id: tokenId, content: _content, owner: msg.sender, tags: _tags, created: block.timestamp, amount: _amount, exchangeable: false});

        // Store the article in the mapping
        articles[articleCount] = newArticle;

        // Send the mint to the manager
        manager.transfer(_amount);

        // Mint a new NFT for the article and assign it to the caller
        _mint(msg.sender, tokenId);

        // Emit an event
        emit ArticleCreated(articleCount, _content, msg.sender, _amount);
    }

    // A function to exchange an article with another user
    function exchangeArticle(uint256 _articleId, uint _newAmount) public payable {
        // Get the old owner and amount of the article
        address oldOwner = articles[_articleId].owner;
        uint oldAmount = articles[_articleId].amount;
        
        // Check if the new amount is 10% more than the old amount
        require(_newAmount >= oldAmount * 110 / 100, "Exchange not profitable enough (>10%)");

        // Check if the article is marked as exchangeable by the owner
        require(articles[_articleId].exchangeable == true, "Article not marked for sale");

        // Transfer the ownership and update the amount of the article
        articles[_articleId].owner = msg.sender;
        articles[_articleId].amount = _newAmount;

        // Transfer the NFT for the article to the new owner
        _transfer(oldOwner, msg.sender, _articleId);

        // Take a fee from the difference between the new and old amounts (10%)
        uint fee = (_newAmount - oldAmount) / 10;

        // Send the fee to the manager
        manager.transfer(fee);

        // Send the rest of the difference to the old owner
        payable(oldOwner).transfer(_newAmount - oldAmount - fee);

        // Emit an event
        emit ArticleSold(_articleId, oldOwner);
    }

    // A function to change the content of an article
    function exchangeableArticle(uint256 _articleId, bool _exchangeable) public onlyOwner(_articleId) {
        // Update the content and tags of the article with the new details
        articles[_articleId].exchangeable = _exchangeable;

        // Emit an event
        emit ArticleExchangeable(_articleId, _exchangeable);
    }

    // A function to get all articles as an array of structs
    function getAllArticles() public view returns (Article[] memory) {
        // Create a temporary array to store the articles
        Article[] memory allArticles = new Article[](articleCount);

        // Loop through the articles mapping and copy each article to the array
        for (uint i = 1; i <= articleCount; i++) {
            allArticles[i-1] = articles[i];
        }

        // Return the array of articles
        return allArticles;
    }

    function getArticleCount() public view returns (uint256) {
        return articleCount;
    }
}
