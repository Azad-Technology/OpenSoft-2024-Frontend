import styles from "./Comments.module.css";
import { useState, useRef, useEffect } from "react";
import instance from "../../axios.jsx";
import { useStateValue } from "../../MyContexts/StateProvider.jsx";
import { useNavigate } from "react-router-dom";

// let comments = ['Lorem ',
// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.',
// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.'];
// let name = ['abc','def','John Doe'];
// let date = ['10-12-23','11-12-23','01-02-24'];
// let image = ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'];

function NewComments(props) {
  const [{ token, user }, dispatch] = useStateValue();
  const [clicked, setClicked] = useState(false);
  const [state, setState] = useState("See more");
  const [parentHeight, setParentHeight] = useState("auto");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [disableBtn, setDisableBtn] = useState(true);
  const textareaRef = useRef(null);
  const initialParentHeight = useRef(null);
  const initialTextareaHeight = useRef(null);
  // const [showLine, setShowLine] = useState(false); // State variable for showing line
  const [showDiscardBtn, setShowDiscardBtn] = useState(false); // State variable for showing discard button
  const [showBtns, setShowBtns] = useState(false); // State variable to show/hide buttons
  // const [showSubmitBtn, setShowSubmitBtn] = useState(false); // State variable for showing discard button
  const navigate = useNavigate();

  function SwitchState() {
    setClicked(!clicked);
    const elem = document.getElementById("showMoreBtn");

    if (state === "See more") {
      setState("See less");
      elem.style.transform = "rotate(0deg)";
    } else {
      setState("See more");
      elem.style.transform = "rotate(180deg)";
    }
  }

  function no_of_lines() {
    const strEle = document.getElementById("myTextArea");
    let count = 0;
    if (strEle != null) {
      const str = document.getElementById("myTextArea").value;
      const len = str.length;
      for (let i = 0; i < len; i++) {
        if (str[i] == "\n") {
          count++;
        }
      }
    }
    return count;
  }

  function handleTextAreaChange(event) {
    setNewComment(event.target.value);
    if (event.target.value) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }

  }

  const [newComment, setNewComment] = useState("");



  const handleSubmit = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        await instance.post(
          "/comment",
          {
            comment: newComment,
            movie_id: props.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const temp = {
          name: user.name,
          text: newComment
        }
        let curr = props.info;
        curr.unshift(temp);
        props.setComments(curr);
        setNewComment("");
        // window.location.reload();
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const handleTextAreaClick = () => {
    // setShowSubmitBtn(true); // Show submit button when textarea is clicked
    setShowBtns(true); // Show buttons when textarea is clicked
    setShowLine(true); // Show line when textarea is clicked
    // setShowDiscardBtn(true); // Show discard button when textarea is clicked
  };

  const handleDiscardClick = () => {
    // setShowSubmitBtn(false); // Hide submit button when discard button is clicked
    setShowBtns(false); // Hide buttons when discard button is clicked
    // setShowLine(false); // Hide line when discard button is clicked
    // setShowDiscardBtn(false); // Hide discard button when discard button is clicked
    setNewComment(""); // Clear textarea content
  };

  return (
    <>
      <div className={styles.commentContainer}>
        <div className={styles.heading}>Comments</div>
        <div className={styles.yourComment}>
          <div className={styles.imgTextBtnContainer} style={{ height: parentHeight }}>
            <div className={styles.userImg}> </div>
            <div className={styles.commentTextBox}>

              <textarea
                id="myTextArea"
                ref={textareaRef}
                name="typeComment"
                placeholder="Type your comment here..."
                className={`${styles.typeComment} ${styles.textBtnCont}`}
                style={{ height: "100%", overflow: "hidden", whiteSpace: "pre-wrap" }}
                onChange={event => handleTextAreaChange(event)}
                onClick={handleTextAreaClick} // Call handleTextAreaClick when textarea is clicked
                value={newComment}
              ></textarea>

              {showBtns && (
                <div className={styles.btnGroup}>
                  <button onClick={handleSubmit} className={styles.submitBtn} disabled={disableBtn}>
                    Submit
                  </button>
                  <button className={styles.discardBtn} onClick={handleDiscardClick}>
                    Discard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {props.info.length ? (
          <div className={styles.allComments}>
            {clicked ? (
              props.info.map((comment, index) => (
                <div key={index} className={styles.allCommentsContainer}>
                  <div className={styles.commentInfo}>
                    <div className={styles.imgContainer}></div>
                    <div className={styles.userName}>@{comment.name}</div>
                  </div>
                  <div className={styles.commentContent}>
                    <div className={styles.commentContent}>{comment.text}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.allCommentsContainer}>
                <div className={styles.commentInfo}>
                  <div className={styles.imgContainer}></div>
                  <div className={styles.userName}>@{props.info[0].name}</div>
                </div>
                <div className={styles.commentContent}>
                  <div className={styles.commentContent}>{props.info[0].text}</div>
                </div>
              </div>
            )}
            {props.info.length > 1 ? (
              <div className={styles.showMoreBtnContainer}>
                <button onClick={SwitchState} className={styles.showMoreBtn} id="showMoreBtn">
                  <svg
                    // fill="#cf0a0a"
                    fill="#fffe3e"
                    height="25px"
                    width="25px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512.001 512.001"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default NewComments;