export function loadLogicStart(props){
	if(!(props.isLoaded)){
      	console.log("LOAD LOGIC--- triggering initial data load.")
        props.triggerInitialDataLoad();
    }
 }

export function loadLogicProgress(currentProps, nextProps, validateCategory){

     if (!(currentProps.isPostsLoaded) && nextProps.isPostsLoaded){
       console.log("Posts have just loaded therefore I will load comments and set counts.....")
       	nextProps.setPostCommentCounts(nextProps.posts)
     }
        
      if(!(currentProps.isAllCommentCountsSet) && nextProps.isAllCommentCountsSet){
        //just finished setting all comment counts
        nextProps.finishedLoadingData();
      }

     if (nextProps.isLoaded && nextProps.currentCategory!== nextProps.match.params.cat ? nextProps.match.params.cat : "" ) 
     	nextProps.setCurrentCategory(nextProps.match.params.cat ? nextProps.match.params.cat : "" )

      if(nextProps.categories) {
          	if (nextProps.match.params.cat)
              	validateCategory(nextProps.match.params.cat)
        }
}
  