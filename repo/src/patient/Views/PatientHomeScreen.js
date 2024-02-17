import React, { useState, useEffect } from 'react';

const jokes = [
  "I'm on a whiskey diet. I've lost three days already.",
  "The future, the present, and the past walked into a bar. Things got a little tense.",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "My wife told me I should do lunges to stay in shape. That would be a big step forward.",
  "Why did the scarecrow become a successful neurosurgeon? He was outstanding in his field.",
  "I told my computer I needed a break, and now it won’t stop sending me beach vacation ads.",
  "Why don't skeletons fight each other? They don't have the stomach for it.",
  "I asked the librarian if the library had any books on paranoia. She whispered, 'They're right behind you...'",
  "Why don't some couples go to the gym? Because some relationships don't work out.",
  "I would avoid the sushi if I were you. It’s a little fishy.",
  "Want to hear a joke about construction? I’m still working on it.",
  "I used to play piano by ear, but now I use my hands.",
  "The rotation of the earth really makes my day.",
  "I've invented a new word: Plagiarism.",
  "Did you hear about the mathematician who’s afraid of negative numbers? He’ll stop at nothing to avoid them.",
  "Why do we tell actors to 'break a leg'? Because every play has a cast.",
  "Yesterday I saw a guy spill all his Scrabble letters on the road. I asked him, 'What’s the word on the street?'",
  "Hear about the new restaurant called Karma? There’s no menu: You get what you deserve.",
  "A woman in labor suddenly shouted, 'Shouldn’t! Wouldn’t! Couldn’t! Didn’t! Can’t!' 'Don’t worry,' said the doctor. 'Those are just contractions.'",
  "A bear walks into a bar and says, 'Give me a whiskey and … cola.' 'Why the big pause?' asks the bartender. The bear shrugged. 'I’m not sure; I was born with them.'", 
  "Why don’t scientists trust atoms? Because they make up everything.",
  "Why did the chicken go to the séance? To talk to the other side.",
  "I told my wife she should embrace her mistakes. She gave me a hug.",
  "Why don’t skeletons fight each other? They don’t have the guts.",
  "What do you call fake spaghetti? An impasta.",
  "Why did the math book look sad? Because it had too many problems.",
  "Why are ghosts bad liars? Because they are too transparent.",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "Why couldn’t the bicycle stand up by itself? It was two-tired.",
  "What did the grape say when it got stepped on? Nothing, but it let out a little wine.",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Did you hear about the claustrophobic astronaut? He just needed a little space.",
  "Why don’t we ever tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
  "What do you get when you cross a snowman and a vampire? Frostbite.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "Why don’t eggs tell jokes? They’d crack each other up.",
  "I would tell you a joke about an invisible man, but I can't see it being funny.",
  "What do you call a fish wearing a crown? A king salmon.",
  "How do you organize a space party? You planet.",
  "What’s orange and sounds like a parrot? A carrot."
];

function PatientHomeScreen({ profile }) {
  const [randomJoke, setRandomJoke] = useState('');

  useEffect(() => {
    // Select a random joke
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setRandomJoke(joke);
  }, []);

  return (
    <div className="patient-home">
      <h1>Welcome back, {profile.name}!</h1>
      <div className="patient-info">
        <p><strong>Patient Name:</strong> {profile.name}</p>
        <p><strong>Date of Birth:</strong> {profile.dob || 'N/A'}</p> {/* Providing a fallback if dob isn't available */}
        <p><strong>Email Address:</strong> {profile.email}</p>
      </div>
      <div className="joke-column">
        <h2>Here's a joke for you!</h2>
        <p>{randomJoke}</p>
      </div>
    </div>
  );
}

export default PatientHomeScreen;
