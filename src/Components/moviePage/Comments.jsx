import styles from "./Comments.module.css";
import {useState, useRef, useEffect} from "react";
import instance from "../../axios.jsx";
import {useStateValue} from "../../MyContexts/StateProvider.jsx";
import {useNavigate} from "react-router-dom";

// let comments = ['Lorem ',
// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.',
// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus.'];
// let name = ['abc','def','John Doe'];
// let date = ['10-12-23','11-12-23','01-02-24'];
// let image = ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'];

function NewComments(props) {
  const [{token,user}, dispatch] = useStateValue();

 
  const [isOpenArray, setIsOpenArray] = useState(Array(10).fill(false));

  const toggleComment = (index) => {
    const newArray = [...isOpenArray];
    newArray[index] = !newArray[index];
    setIsOpenArray(newArray);
  };

  const maxLength=150; // Max length of comment

  function truncateComment(comment, maxLength) {
    if (comment.length <= maxLength) {
      return comment;
    }

    // Truncate the comment to the specified maximum length and add "..."
    return comment.slice(0, maxLength) + '...';
  }






//check mobile view
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example threshold for mobile view
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for screen size
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(props);
  }, [props]);
  let comments = props.info.map(obj => {
    return obj.text;
  });

  let name = props.info.map(obj => {
    return obj.name;
  });

  // Assuming you have an array of profile picture links
const profilePicLinks = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0xnK9Tda9uC_GlPVkwcQO9dRVaCoBWs73V5Yf_FFN8i5gWSzrxBw2oS126sikhXYpQM&usqp=CAU",
  "https://w0.peakpx.com/wallpaper/1020/704/HD-wallpaper-iron-man-hero-marvel-movie.jpg",
  "https://pics.craiyon.com/2023-07-13/70f4c8db63f94f30b453aee048daee7b.webp",
  "https://pics.craiyon.com/2023-05-31/220e4c73f6674d46a84840ebde9f9bc8.webp",
  "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0xnK9Tda9uC_GlPVkwcQO9dRVaCoBWs73V5Yf_FFN8i5gWSzrxBw2oS126sikhXYpQM&usqp=CAU",
  "https://w0.peakpx.com/wallpaper/1020/704/HD-wallpaper-iron-man-hero-marvel-movie.jpg",
  "https://pics.craiyon.com/2023-07-13/70f4c8db63f94f30b453aee048daee7b.webp",
  "https://pics.craiyon.com/2023-05-31/220e4c73f6674d46a84840ebde9f9bc8.webp",
  "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png",
];

function getProfilePicLink(username) {
  // Find the index of the username in the 'name' array
  const index = name.indexOf(username);
  if (index !== -1) {
    // If the username is found, use modulus to cycle through the profile picture links
    return profilePicLinks[index];
  } else {
    // If the username is not found, return a default profile picture link
    return "default_profile_pic.jpg";
  }
}


  let date = props.info.map(obj => {
    return obj.date;
  });

  const [clicked, setClicked] = useState(false);
  const [state, setState] = useState("See more");
  const [parentHeight, setParentHeight] = useState("auto");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [disableBtn, setDisableBtn] = useState(true);
  const textareaRef = useRef(null);
  const initialParentHeight = useRef(null);
  const initialTextareaHeight = useRef(null);
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
    const newTextareaHeight = no_of_lines() + 2 + "rem";
    const parentHeight = no_of_lines() + 4 + "rem";

    const typeComment = document.getElementById("myTextArea");
    typeComment.style.height = newTextareaHeight;

    setTextareaHeight(newTextareaHeight);
    setParentHeight(parentHeight);
  }

  const [newComment, setNewComment] = useState("");

  function handleTextareaFocus(event) {
    const newTextareaHeight = no_of_lines() + 2 + "rem";
    const parentHeight = no_of_lines() + 4 + "rem";

    const typeComment = document.getElementById("myTextArea");
    typeComment.style.height = newTextareaHeight;

    setTextareaHeight(newTextareaHeight);
    setParentHeight(parentHeight);
  }

  function handleTextareaBlur(event) {
    setTextareaHeight(no_of_lines() + 2 + "rem");
    setParentHeight(no_of_lines() + 4 + "rem");
  }

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
          text: newComment,
        };
        let curr = props.info;
        curr.unshift(temp);
        props.setComments(curr);
        setNewComment("");
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={styles.commentContainer}>
        <div className={styles.heading}>Comments</div>
        <div className={styles.yourComment}>
          <div className={styles.imgTextBtnContainer} style={{height: parentHeight}}>
            <div className={styles.userImg}></div>
            <div className={styles.textBtnCont} style={{height: parentHeight}}>
              <div className={styles.textArea} style={{height: textareaHeight}}>
                <textarea
                  id="myTextArea"
                  ref={textareaRef}
                  name="typeComment"
                  placeholder="Type your comment here..."
                  cols={190}
                  className={styles.typeComment}
                  style={{height: "100%", overflow: "hidden", whiteSpace: "pre-wrap"}}
                  onChange={event => handleTextAreaChange(event)}
                  onFocus={handleTextareaFocus}
                  // onBlur={handleTextareaBlur}
                  value={newComment}
                ></textarea>
              </div>
              <div className={styles.submitBtnContainer}>
                {disableBtn && (
                  <button type="submit" className={styles.submitBtn} disabled>
                    Submit
                  </button>
                )}
                {!disableBtn && (
                  <button onClick={e => handleSubmit(e)} className={styles.submitBtn}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {props.info.length ? (
          <div className={styles.allComments}>
            {clicked ? (
              props.info.map((comment, index) => (
                <div key={index} className={styles.allCommentsContainer}>
                  <div className={styles.commentInfo}>
                    <div className={styles.imgContainer}>
                      <img src={getProfilePicLink(name[index])} className={styles.imgContainer}></img>
                    </div>
                    <div className={styles.userName}>@{name[index]}</div>
                  </div>
                  <div className={styles.commentContent}>
                    <div className={styles.commentContent}>
                    {
                          isMobile && comments[index].length>maxLength ? (
                            <>
                              <p>
                                {isOpenArray[index]?(
                                  <p>
                                  {comments[index]}
                                  </p>
                                ):(
                                  <p>
                                  {truncateComment(comments[index],maxLength)}
                                  </p>
                                )

                              }
                                
                              </p>
                              <button onClick={()=>toggleComment(index)} className={styles.readMoreBtn}>
                                {isOpenArray[index]? 'read less...': 'read more...'}
                              </button>
                              
                            </>
                          ):(
                            <>{comments[index]}</>
                          )
                    }
                    {/* <p style={isOpen? null: paragraphStyle}>
                      {comments[0]}
                    </p> */}

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.allCommentsContainer}>
                <div className={styles.commentInfo}>
                  <div className={styles.imgContainer}>
                    <img src={profilePicLinks[0]} className={styles.imgContainer}></img>
                  </div>
                  <div className={styles.userName}>@{name[0]}</div>
                </div>
                <div className={styles.commentContent}>
                  <div className={styles.commentContent}>
                  {
                        isMobile && comments[0].length>maxLength ? (
                          <>
                            <p>
                              {isOpenArray[0]?(
                                <p>
                                {comments[0]}
                                </p>
                              ):(
                                <p>
                                {truncateComment(comments[0],maxLength)}
                                </p>
                              )

                            }
                              
                            </p>
                            <button onClick={()=>toggleComment(0)} className={styles.readMoreBtn}>
                              {isOpenArray[0]? 'read less...': 'read more...'}
                            </button>
                          </>
                        ):(
                          <>{comments[0]}</>
                        )
                  }
                  {/* <p style={isOpen? null: paragraphStyle}>
                    {comments[0]}
                  </p> */}

                  </div>
                </div>
              </div>
            )}
            {props.info.length > 1 ? (
              <div className={styles.showMoreBtnContainer}>
                <button onClick={SwitchState} className={styles.showMoreBtn} id="showMoreBtn">
                  <svg
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
