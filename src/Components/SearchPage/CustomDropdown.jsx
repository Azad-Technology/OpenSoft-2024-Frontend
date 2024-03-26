import React, {useState, useEffect} from "react";
import styles from "./CustomDropdown.module.css";
import {useRef} from "react";

const CustomDropdown = ({label, options, selectedItems, updateSelectedItems}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add the event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove the listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const options = [
  //   { label: 'Option 1', value: 'option1' },
  //   { label: 'Option 2', value: 'option2' },
  //   { label: 'Option 3', value: 'option3' },
  // ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    dropdownRef.current.classList.toggle("open");
  };

  const handleSelectChange = event => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    updateSelectedItems &&
      updateSelectedItems(
        // Use the update function
        isChecked ? [...selectedItems, value] : selectedItems.filter(item => item !== value)
      );
  };

  const displaySelected = label => {
    if (selectedItems.length === 0) {
      return label; // Display 'Genre', 'Year', or 'Language'
    } else if (selectedItems.length > 1) {
      return `${selectedItems.slice(0, 1).join(", ")} + ${selectedItems.length - 1} more`;
    } else {
      return selectedItems.join(", ");
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
          {options.map(option => (
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
};

export default CustomDropdown;

//
