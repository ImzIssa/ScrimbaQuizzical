import React from 'react';

export default function Answer ({ isChecked, isSelected, isCorrectAnswer, value, handleClick }) {
	let styles = {}
	if(isChecked && isCorrectAnswer) styles.backgroundColor = "#94D7A2"
	else if(isChecked && !isCorrectAnswer) styles.backgroundColor = "#F8BCBC"
	else 
	 styles.backgroundColor = isSelected? "#D6DBF5": ""

    return (
    	<div 
    		className="answer" 
    		onClick={handleClick}
    		style={styles}
    	>{value}
    	</div>
    );
};

