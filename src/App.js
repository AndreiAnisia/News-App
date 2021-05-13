import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';

const alanKey =
   '43c3a25714e0ec14cb772ad893afc26a2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
   const [newsArticles, setNewsArticles] = useState([]);
   const [activeArticle, setActiveArticle] = useState(-1);
   const classes = useStyles();

   useEffect(() => {
      alanBtn({
         key: alanKey,
         onCommand: ({ command, articles }) => {
            if (command === 'newHeadlines') {
               console.log(articles);
               setNewsArticles(articles);
               setActiveArticle(-1);
            } else if (command === 'highlight') {
               setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            }
         },
      });
   }, []);

   return (
      <div>
         <div className={classes.logoContainer}>
            <img
               className={classes.alanLogo}
               alt="alan logo"
               src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg"
            />
         </div>
         <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
   );
};

export default App;
