import styles from "./Comments.module.css";
import { useState, useRef, useEffect } from "react";

 

// let comments = ['Lorem ',
// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.',
// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.'];
// let name = ['abc','def','John Doe'];
// let date = ['10-12-23','11-12-23','01-02-24'];
// let image = ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'];

// function YourComment(){
//   function ExpandingTextArea() {
//     const [text, setText] = useState('');
//     const [parentHeight, setParentHeight] = useState('auto');
  
//     const handleChange = (event) => {
//       const textareaLineHeight = 24; // Adjust this value according to your textarea's line-height
//       const currentRows = Math.ceil(event.target.scrollHeight / textareaLineHeight);
//       setParentHeight(`${currentRows * textareaLineHeight}px`);
//       setText(event.target.value);
//     };
  
//     return (
//       <div style={{ height: parentHeight, overflow: 'hidden' }}>
//         <textarea
//           value={text}
//           onChange={handleChange}
//           style={{ height: '100%', boxSizing: 'border-box', resize: 'none', overflowY: 'scroll', border: '1px solid #ccc' }}
//         />
//       </div>
//     );
//   }
//     return (
//         <>  
//             <div>
//                 <form method="POST">
//                     { /* <textarea name="typeComment" placeholder="Type your comment here..." className={styles.typeComment}></textarea> */}
//                     <ExpandingTextArea />
//                     {/* <br></br> */}
//                     <input type="submit" value="Submit" className={styles.btn}></input>
//                 </form>
//             </div>
//         </>
//     )
// }

// function Comments(){
//     const [clicked,setClicked] = useState(false);
//     const [state,setState] = useState("See more");
  
//     function SwitchState(){
//       setClicked(!clicked);
//       if(state==="See more"){
//         setState("See less");
//       }
//       else{
//         setState("See more");
//       }
//     }
  
//     console.log(clicked);
  
//     return (    
//       <>
//         <div className={styles.yourComment}>
//           <div className={styles.heading}>Your Comment</div> 
//           <YourComment />
//         </div>

//         <div className={styles.commentContainerParent}>
//           <div className={styles.heading}>Comments</div>
//           <div className={styles.commentParent}>
//             <div className={styles.container}>
//               {clicked ? (
//                 comments.map((comment, index) => (
//                   <div key={index} className={styles.commentContainer}>
//                     <div className={styles.imgContainer}>
//                       {/* <img src={image[index]} alt="userImage"></img> */}
//                     </div>
//                     <div className={styles.otherInfo}>
//                       <div className={styles.userName}>{name[index]}</div>
//                       <div className={styles.datePosted}>{date[index]}</div>
//                       <div className={styles.commentContent}>{comment}</div>
//                     </div>
//                    </div>
//             ))
//           ) : (
//             <div className={styles.commentContainer}>
//               <div className={styles.imgContainer}></div>
//               <div className={styles.otherInfo}>
//                   <div className={styles.userName}>{name[0]}</div>
//                   <div className={styles.datePosted}>{date[0]}</div>
//                   <div className={styles.commentContent}>{comments[0]}</div>
//               </div>
//             </div>
//           )}

//           <button onClick = {SwitchState} className={styles.btn}>{state}</button>


//         </div>
//         </div>
//         </div>



        
//       </>
//     );
//   }

  function NewComments(props) {
    let comments = props.info.map((obj)=>{
      return obj.text;
    });

    let name = props.info.map((obj)=>{
      return obj.name;
    });

    let date = props.info.map((obj)=>{
      return obj.date;
    });

    // let image = props.info.map((obj)=>{
    //   return obj.image;
    // });

    const [clicked, setClicked] = useState(false);
    const [state, setState] = useState("See more");
    const [parentHeight, setParentHeight] = useState('auto');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const [disableBtn, setDisableBtn] = useState(true);
    const textareaRef = useRef(null);
    const initialParentHeight = useRef(null);
    const initialTextareaHeight = useRef(null);
  
    function SwitchState() {
      setClicked(!clicked);
      const elem = document.getElementById("showMoreBtn");

      if (state === "See more") {
        setState("See less");
        elem.style.transform = 'rotate(0deg)';
      } else {
        setState("See more");
        elem.style.transform = 'rotate(180deg)';
      }
    }

    function no_of_lines(){
      const strEle = document.getElementById('myTextArea');
      let count = 0;
      if(strEle!=null){
        const str = document.getElementById('myTextArea').value;
        const len = str.length;
        for(let i=0;i<len;i++){
          if(str[i]=='\n'){
            count++;
          }
        }
      }
      console.log(count);
      return count;
    }

    // function handleTextAreaChange(event) {
    //   const textareaLineHeight = 12;
    //   const currentRows = Math.ceil(event.target.scrollHeight / textareaLineHeight);
    //   const newTextareaHeight = `${currentRows * textareaLineHeight}px`;
    
    //   // Adjust textarea height to fit content
    //   event.target.style.height = newTextareaHeight;
    
    //   // Adjust parent height to match textarea height
    //   const parentHeight = `${currentRows * textareaLineHeight}px`;
    //   setParentHeight(parentHeight);
    
    //   // Enable/disable button based on textarea content
    //   setDisableBtn(!event.target.value.trim());
    
    //   // Store initial heights if not already stored
    //   if (!initialParentHeight.current) {
    //     initialParentHeight.current = parentHeight;
    //   }
    //   if (!initialTextareaHeight.current) {
    //     initialTextareaHeight.current = newTextareaHeight;
    //   }
    // }
    
  

    // function handleTextareaFocus(event) {
    //   // Calculate textarea height based on current content
    //   const textareaLineHeight = 12; 
    //   const currentRows = Math.ceil(event.target.scrollHeight / textareaLineHeight);
    //   const newTextareaHeight = `${currentRows * textareaLineHeight}px`;
    
    //   // Adjust textarea height to fit content
    //   event.target.style.height = newTextareaHeight;
    
    //   // Adjust parent height to match textarea height
    //   // const parentHeight = `${currentRows * textareaLineHeight + auto}px`;
    // }
    
    function handleTextAreaChange(event) {
      const newTextareaHeight = no_of_lines()+2+'rem';
      const parentHeight = no_of_lines()+4+'rem';

      const typeComment = document.getElementById('myTextArea');
      typeComment.style.height = newTextareaHeight;

      const textArea = document.getElementsByClassName('textArea');
      textArea[0].style.height = newTextareaHeight;

      const textBtnCont = document.getElementsByClassName('textBtnCont');
      textBtnCont[0].style.height = parentHeight;

      setTextareaHeight(newTextareaHeight);
      setParentHeight(parentHeight);
    }
    
  

    function handleTextareaFocus(event) {
      const newTextareaHeight = no_of_lines()+2+'rem';
      const parentHeight = newTextareaHeight+4+'rem';

      // event.target.style.height =  newTextareaHeight;
      const typeComment = document.getElementById('myTextArea');
      typeComment.style.height = newTextareaHeight;

      const textArea = document.getElementsByClassName('textArea');
      textArea[0].style.height = newTextareaHeight;

      const textBtnCont = document.getElementsByClassName('textBtnCont');
      textBtnCont[0].style.height = parentHeight;


      setTextareaHeight(newTextareaHeight); 
      setParentHeight(parentHeight);
    }

    function handleTextareaBlur(event) {
      setTextareaHeight(no_of_lines()+2 + 'rem');
      setParentHeight(no_of_lines()+4 + 'rem');
    }
  
    return (
      <>
        <div className={styles.commentContainer}>
          <div className={styles.heading}>Comments</div>
          <div className={styles.yourComment}>
            <div className={styles.imgTextBtnContainer}>
              <div className={styles.userImg}> </div>
              <div className={styles.textBtnCont} style={{ height: parentHeight }}>
                <div className={styles.textArea} style={{ height: textareaHeight }}>
                  <textarea id="myTextArea"
                    ref={textareaRef}
                    name="typeComment"
                    placeholder="Type your comment here..."
                    cols={190}
                    className={styles.typeComment}
                    style={{ height: '100%', overflow: 'hidden', whiteSpace: 'pre-wrap' }} // Ensure no scrollbar and wrap long lines
                    onChange={handleTextAreaChange} 
                    onFocus={handleTextareaFocus}
                    // onBlur={handleTextareaBlur}
                  ></textarea>
                </div>
                <div className={styles.submitBtnContainer}>
                  {disableBtn && (<button type="submit" className={styles.submitBtn} disabled>Submit</button>)}
                  {!disableBtn && (<button type="submit" className={styles.submitBtn} >Submit</button>)}
                  
                </div>
              </div>
            </div>
          </div>


          {
            comments.length?(
              <div className={styles.allComments}>
              {clicked ? (
                comments.map((comment, index) => (
                  <div key={index} className={styles.allCommentsContainer}>
                    <div className={styles.commentInfo}>
                      <div className={styles.imgContainer}></div>
                      <div className={styles.userName}>@{name[index]}</div>
                    </div>
                    <div className={styles.commentContent}>
                      <div className={styles.commentContent}>{comment}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.allCommentsContainer}>
                  <div className={styles.commentInfo}>
                    <div className={styles.imgContainer}></div>
                    <div className={styles.userName}>@{name[0]}</div>
                  </div>
                  <div className={styles.commentContent}>
                    <div className={styles.commentContent}>{comments[0]}</div>
                  </div>
                </div>
              )}
              {(comments.length>1)?(
                <div className={styles.showMoreBtnContainer}>
                <button onClick={SwitchState} className={styles.showMoreBtn} id="showMoreBtn"><svg fill="#cf0a0a" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokelinecap="round" strokelinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path> </g> </g> </g></svg></button>
                </div>
              ):(
                <></>
              )}
              
              </div>
            ):(
              <></>
            )
          }
          
          
        </div>
      </>
    )
  }

  // function NewComments(){
  //   const [clicked,setClicked] = useState(false);
  //   const [state,setState] = useState("See more");
  
  //   function SwitchState(){
  //     setClicked(!clicked);
  //     if(state==="See more"){
  //       setState("See less");
  //     }
  //     else{
  //       setState("See more");
  //     }
  //   }

  //   return (
  //     <>
  //       <div className={styles.commentContainer}>
  //         <div className={styles.heading}>Comments</div>
  //         <div className={styles.yourComment}>
  //           <div className={styles.imgTextBtnContainer}>
  //             <div className={styles.userImg}> </div>
  //             <div className={styles.textBtnCont}>
  //               <div className={styles.textArea}>
  //                 <textarea name="typeComment" placeholder="Type your comment here..." cols={190} className={styles.typeComment}></textarea>
  //               </div>
  //               <div className={styles.submitBtnContainer}>
  //                 <input type="submit" value="Submit" className={styles.submitBtn}></input>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className={styles.allComments}>
  //           {clicked ? (
  //                 comments.map((comment, index) => (
  //                   <div key={index} className={styles.allCommentsContainer}>
  //                     <div className={styles.commentInfo}>
  //                       <div className={styles.imgContainer}></div>
  //                       <div className={styles.userName}>@{name[index]}</div>
  //                     </div>
  //                     <div className={styles.commentContent}>
  //                       <div className={styles.commentContent}>{comment}</div>
  //                     </div>
  //                   </div>
  //             ))
  //           ) : (
  //             <div className={styles.allCommentsContainer}>
  //               <div className={styles.commentInfo}>
  //                 <div className={styles.imgContainer}></div>
  //                 <div className={styles.userName}>@{name[0]}</div>
  //               </div>  
  //               <div className={styles.commentContent}>
  //                   <div className={styles.commentContent}>{comments[0]}</div>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //         <button onClick = {SwitchState} className={styles.btn}>{state}</button>
  //       </div>
  //     </>
  //   )
    
  // }

  export default NewComments;