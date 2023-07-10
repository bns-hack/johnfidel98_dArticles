import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import MKButton from "components/MKButton";
import { Link } from "react-router-dom";

export const ArticleContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const articlesContract = new ethers.Contract(contractAddress, contractABI, signer);

  return articlesContract;
};

export const ArticlesProvider = ({ children }) => {
  const [formData, setFormData] = useState({ tags: "", amount: "", content: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [articleCount, setArticleCount] = useState(localStorage.getItem("articleCount"));
  const [articleIds, setArticleIds] = useState([]);
  const [articlesData, setArticlesData] = useState({});

  // handle notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: "", message: "" });

  const handleChange = (e, name) => {
    if (name == "content") {
      setFormData((prevState) => ({ ...prevState, [name]: e }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
  };

  const getAllArticles = async () => {
    // get all articles
    try {
      if (ethereum) {
        const articlesContract = await createEthereumContract();
        const availableArticles = await articlesContract.getAllArticles();

        // build new data
        let xData = {};

        const sArticles = availableArticles.map((art) => {
          const d = JSON.parse(art.content);
          const aData = {
            id: ethers.toNumber(art.id),
            owner: art.owner,
            tags: String(art.tags).split(","),
            content: d.co,
            exchangeable: art.exchangeable,
            author: d.au,
            title: d.tx,
            amount: parseInt(art.amount) / 10 ** 18,
            created: new Date(ethers.toNumber(art.created) * 1000).toLocaleString(),
          };

          xData[aData.id] = aData;

          return aData.id;
        });

        // update articles data state
        setArticlesData(xData);

        // sort articles
        setArticleIds(sArticles.sort().reverse());
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        setShowNotification(true);
        setNotification({
          title: "Missing Browser Extension!",
          message: "Please install MetaMask.",
        });
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllArticles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfArticlesExists = async () => {
    // check if there are any articles
    try {
      if (ethereum) {
        const articlesContract = await createEthereumContract();
        const currentArticleCount = await articlesContract.getArticleCount();

        window.localStorage.setItem("articleCount", currentArticleCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setShowNotification(true);
        setNotification({
          title: "Missing Browser Extension!",
          message: "Please install MetaMask.",
        });
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const mintArticle = async () => {
    try {
      if (ethereum) {
        const { amount, tags, content, author, title } = formData;

        // hydrate content
        const hydratedContent = JSON.stringify({ tx: title, au: author, co: content, vs: "1.0.0" });
        const articlesContract = await createEthereumContract();

        // request minting payment
        // await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [
        //     {
        //       from: currentAccount,
        //       to: myAddress,
        //       gas: "0x5208",
        //       value: ethers.toBeHex(ethers.parseEther(amount)),
        //     },
        //   ],
        // });

        // send transaction to contract
        const articleHash = await articlesContract.createArticle(
          hydratedContent,
          tags,
          ethers.toBeHex(ethers.parseEther(amount))
        );

        setIsLoading(true);
        await articleHash.wait();

        const articlesCount = await articlesContract.getArticleCount();

        setArticleCount(ethers.toNumber(articlesCount));
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const buyArticle = async (articleId, amount) => {
    try {
      if (ethereum) {
        const articlesContract = await createEthereumContract();

        // send transaction to contract
        const articleHash = await articlesContract.exchangeArticle(
          articleId,
          ethers.toBeHex(ethers.parseEther(amount))
        );

        setIsLoading(true);
        await articleHash.wait();

        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const toggleExchangability = async (articleId, exchangeable) => {
    try {
      if (ethereum) {
        const articlesContract = await createEthereumContract();

        // send transaction to contract
        const articleHash = await articlesContract.exchangeableArticle(articleId, exchangeable);

        setIsLoading(true);
        await articleHash.wait();

        await getAllArticles();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfArticlesExists();
  }, [articleCount]);

  const getMainAction = (section = "bottom", label = "Articles") => (
    <>
      {currentAccount ? (
        section == "top" ? (
          <MKButton
            component={Link}
            variant="gradient"
            color="primary"
            size="large"
            fullWidth
            to="/articles"
            sx={{ boxShadow: "none" }}
          >
            {label}
          </MKButton>
        ) : (
          <MKButton
            component={Link}
            variant="gradient"
            color="primary"
            size="large"
            fullWidth
            to="/articles/create"
            sx={{ boxShadow: "none" }}
          >
            <Icon>post_add</Icon>&nbsp; post article
          </MKButton>
        )
      ) : (
        <MKButton
          variant="gradient"
          color="primary"
          size="large"
          fullWidth
          onClick={connectWallet}
          sx={{ boxShadow: "none" }}
        >
          <Icon>account_balance_wallet</Icon>&nbsp; connect wallet
        </MKButton>
      )}
    </>
  );

  return (
    <ArticleContext.Provider
      value={{
        articleCount,
        connectWallet,
        articleIds,
        currentAccount,
        getMainAction,
        toggleExchangability,
        isLoading,
        mintArticle,
        handleChange,
        formData,
        notification,
        getAllArticles,
        buyArticle,
        showNotification,
        setShowNotification,
        articlesData,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

ArticlesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
