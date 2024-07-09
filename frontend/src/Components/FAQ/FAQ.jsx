import React, { useState } from 'react';
import './FAQ.css'; // Ensure the CSS file is linked

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-item">
            <button className="accordion-question" onClick={() => setIsOpen(!isOpen)}>
                {question}
                <span className="accordion-icon">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && <div className="accordion-answer">{answer}</div>}
        </div>
    );
};

const FAQ = () => {
    const questionsAnswers = [
        {
            question: "Can I place an order for a person residing elsewhere within the delivery grid?",
            answer: "Yes, you can place an order for a recipient other than yourself by stating the delivery address and details accurately prior to checkout."
        },
        {
            question: "How do I know my order is confirmed?",
            answer: "You will receive an order confirmation via email once your order has been placed. If you do not receive an email, please contact us."
        },
        {
            question: "Is there a delivery charge for online orders?",
            answer: "A revised charge of Rs. 325 applies as a transaction processing and delivery fee for all orders placed under the home delivery option."
        },
        {
            question: "What happens if you make the delivery to the incorrect address?",
            answer: "We will call and confirm the address and the route before delivering the order and any inaccuracies in the address can be mentioned assuming the address is within the delivery grid of the store the order was placed to."
        },
        // Add more questions and answers as needed
    ];

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            {questionsAnswers.map((qa, index) => (
                <AccordionItem key={index} question={qa.question} answer={qa.answer} />
            ))}
        </div>
    );
}

export default FAQ;