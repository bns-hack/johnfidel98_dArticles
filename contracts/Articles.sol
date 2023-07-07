// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArticlesContract {
    // A struct to store the article and its owner
    struct Article {
        string content;
        address owner;
        string tags; // comma separated
        uint256 created;
        uint amount;
    }

    // A mapping from article ID to Article struct
    mapping(uint256 => Article) public articles;

    // A counter to generate unique article IDs
    uint256 public articleCount;

    // An event to emit when an article is created
    event ArticleCreated(uint256 indexed articleId, string content, address indexed owner, uint amount);

    // An event to emit when an article is exchanged
    event ArticlesContractd(uint256 indexed articleId, address indexed oldOwner, address indexed newOwner);

    // An event to emit when an article is changed
    event ArticleChanged(uint256 indexed articleId, string oldContent, string newContent, string oldTags, string newTags, address indexed owner);

    // A modifier to check if the caller is the owner of an article
    modifier onlyOwner(uint256 _articleId) {
        require(articles[_articleId].owner == msg.sender, "You are not the owner of this article");
        _;
    }

    // A function to create a new article and assign it to the caller (minting)
    function createArticle(string memory _content, string memory _tags, uint _amount) public {
        // Increment the article count
        articleCount++;

        // Create a new article struct with the given content and the caller as the owner
        Article memory newArticle = Article({content: _content, owner: msg.sender, tags: _tags, created: block.timestamp, amount: _amount});

        // Store the article in the mapping
        articles[articleCount] = newArticle;

        // Emit an event
        emit ArticleCreated(articleCount, _content, msg.sender, _amount);
    }

    // A function to exchange an article with another user
    function exchangeArticle(uint256 _articleId, address _newOwner, uint _newAmount) public {
        // Get the old owner and amount of the article
        address oldOwner = articles[_articleId].owner;
        uint oldAmount = articles[_articleId].amount;

        // Check if the new amount is greater than the old amount
        require(_newAmount > oldAmount, "Exchange not profitable");

        // Transfer the ownership and update the amount of the article
        articles[_articleId].owner = _newOwner;
        articles[_articleId].amount = _newAmount;

        // Emit an event
        emit ArticlesContractd(_articleId, oldOwner, _newOwner);
    }

    // A function to change the content of an article
    function changeArticle(uint256 _articleId, string memory _newContent, string memory _newTags) public onlyOwner(_articleId) {
        // Get the old details of the article
        string memory oldContent = articles[_articleId].content;
        string memory oldTags = articles[_articleId].tags;

        // Update the content and tags of the article with the new details
        articles[_articleId].content = _newContent;
        articles[_articleId].tags = _newTags;

        // Emit an event
        emit ArticleChanged(_articleId, oldContent, _newContent, oldTags, _newTags, msg.sender);
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
