// import React, { useState, useEffect, useRef } from 'react';
// import styles from "./CustomDropdown.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

// const CustomDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const selectBtnRef = useRef(null);
 
//   const toggleDropdown = () => {
//     console.log('Dropdown arrow clicked!');
//     setIsOpen(!isOpen);

//   };

//   const handleItemClick = (item) => {
//     setSelectedItems(prevSelectedItems => {
//       if (prevSelectedItems.includes(item)) {
//         return prevSelectedItems.filter(selectedItem => selectedItem !== item);
//       } else {
//         return [...prevSelectedItems, item];
//       }
//     });
//   };

//   useEffect(() => {
//     // Update button text based on selected items count
//     const selectedCount = selectedItems.length;
//     const btnText = selectedCount > 0 ? `${selectedCount} Selected` : 'Select Language';
//     btnTextRef.current.innerText = btnText;
//   }, [selectedItems]);
//   useEffect(() => {
//     // Add a check to ensure the ref exists before manipulating the element 
//     if (selectBtnRef.current) { 
//       selectBtnRef.current.classList.toggle('open');
//     }
//   }, [isOpen]); 

//   const btnTextRef = useRef(null);

//   return (
//     <>
//     <div className={styles.container}>
//       <div className={styles.selectbtn} ref={selectBtnRef} onClick={toggleDropdown}>
//         <span className={styles.btntext} ref={btnTextRef}>Select Language</span>
//         <span className={styles.arrowdwn}>
//           <FontAwesomeIcon icon={faChevronDown} />
//         </span>
//       </div>
//       <div ref={(el) => { console.log('Inline ref element:', el) }} 
//      onClick={toggleDropdown}> 
//     {/* ... */}
// </div>

//       {isOpen && (
//         <ul className={styles.listItems}>
//           <li className={styles.item} onClick={() => handleItemClick("Javascript")}>
//             <span className={styles.checkbox}>
//               <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
//             </span>
//             <span className={styles.itemtext}>Javascript</span>
//           </li>
//           <li className={styles.item} onClick={() => handleItemClick("Golang")}>
//             <span className={styles.checkbox}>
//               <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
//             </span>
//             <span className={styles.itemtext}>Golang</span>
//           </li>
//           <li className={styles.item} onClick={() => handleItemClick("Angular")}>
//             <span className={styles.checkbox}>
//               <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
//             </span>
//             <span className={styles.itemtext}>Angular</span>
//           </li>
//           <li className={styles.item} onClick={() => handleItemClick("Html")}>
//             <span className={styles.checkbox}>
//               <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
//             </span>
//             <span className={styles.itemtext}>Html</span>
//           </li>
//           <li className={styles.item} onClick={() => handleItemClick("Css")}>
//             <span className={styles.checkbox}>
//               <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
//             </span>
//             <span className={styles.itemtext}>Css</span>
//           </li>
//         </ul>
//       )}
//     </div>
//     </>
//   );
// };

// export default CustomDropdown;
// 
import React, { useState, useEffect } from 'react';
import styles from "./CustomDropdown.module.css";
import { useRef } from 'react';

const CustomDropdown = ({ label, options, selectedItems, updateSelectedItems }) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false);


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add the event listener when the component mounts
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    // Cleanup function to remove the listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // const options = [
  //   { label: 'Option 1', value: 'option1' },
  //   { label: 'Option 2', value: 'option2' },
  //   { label: 'Option 3', value: 'option3' },
  // ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    dropdownRef.current.classList.toggle('open');
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
  const isChecked = event.target.checked;

  updateSelectedItems && updateSelectedItems( // Use the update function
    isChecked 
        ? [...selectedItems, value] 
        : selectedItems.filter(item => item !== value)
  );
  };

  const displaySelected = (label) => {
    if (selectedItems.length === 0) {
      return label; // Display 'Genre', 'Year', or 'Language'
    } else if (selectedItems.length > 1) {
      return `${selectedItems.slice(0, 1).join(', ')} + ${
        selectedItems.length - 1
      } more`;
    } else {
      return selectedItems.join(', ');
    }
  };
  // const displaySelected = () => {
  //   if (selectedGenre.length === 0) {
  //     return 'Genre';
  //   } else if (selectedGenre.length > 2) {
  //     return `${selectedGenre.slice(0, 2).join(', ')} + ${
  //       selectedGenre.length - 2
  //     } more`;
  //   } else {
  //     return selectedGenre.join(', ');
  //   }
  // };

  return (
    <div className={styles.dropdowncontainer} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.dropdownbutton}>
        {displaySelected(label)}
      </button>
      {isOpen && (
        <ul className={styles.dropdownlist}>
          {options.map((option) => (
            <li key={option.value}>
              <label>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedItems.includes(option.value)}
                  onChange={handleSelectChange}
                />
                {option.label}
               
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;

// 