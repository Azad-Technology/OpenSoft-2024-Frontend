import styles from "./Comments.module.css";
import { useState } from "react";

let comments = ['Lorem ',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.'];
let name = ['abc','def','John Doe'];
let date = ['10-12-23','11-12-23','01-02-24'];
let image = ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'];


function Comments(){
    const [clicked,setClicked] = useState(false);
    const [state,setState] = useState("See more");
  
    function SwitchState(){
      setClicked(!clicked);
      if(state==="See more"){
        setState("See less");
      }
      else{
        setState("See more");
      }
    }
  
    // console.log(clicked);
  
    return (    
      <>
          <div className={styles.commentSectionContainer}>
            <div className={styles.heading}>Comments</div>
            <div className={styles.yourCommentContainer}>
              <form>
              <div className={styles.inputContainer}><textarea placeholder="type your comment ..."></textarea></div>
              <div className={styles.submitBtnContainer}><button >Submit</button></div>
              </form>
              
            </div>
          </div>
      </>
    );
  }

  export default Comments;