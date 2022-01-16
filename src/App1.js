import React, { Component } from 'react';
import './App.css';
import Section from './components/section';
import FeedbackOptions from './components/feedbackoptions';
import Statistics from './components/statistics';
import Notification from './components/notification';

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const result = good + neutral + bad;
    return result;
  };
  countPositiveFeedbackPercentage = () => {
    const result = this.countTotalFeedback();
    const { good } = this.state;
    const percentage = (good * 100) / result;
    return Math.round(percentage);
  };
  onLeaveFeedback = e => {
    const name = e.target.name;
    this.setState(prevState => ({ [name]: prevState[name] + 1 }));
  };

  render() {
    const objKey = Object.keys(this.state);
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    return (
      <>
        <div className="App">
          <Section title="Please leave feedback">
            <FeedbackOptions options={objKey} onLeaveFeedback={this.onLeaveFeedback} />
          </Section>

          {total === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Section title="Statistics">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                positivePercentage={positivePercentage}
              />
            </Section>
          )}
        </div>
      </>
    );
  }
}
