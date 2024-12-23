export function MainView(props) {
    
    const mainImageUrl = "https://cdn.discordapp.com/attachments/1310554884105441357/1320485856938823732/pokeymang.png?ex=676a6e89&is=67691d09&hm=f84e7b63907cc9eae2fc55a6c0ff5842b9c925d7a6055b241f473a76502acba5&";

    return (
        <div>
            <div className="main-screen-image-container">
                <img className="main-screen-image" src={mainImageUrl} alt="Team builder main image" />
            </div>
            <div className="main-screen-text-container">
                <h1>About this website</h1>
                <p>
                    This website is made to be able to build your own pokemon teams, learn more about pokemon and their types
                    and compete against other users in who has the most pokemon expertise.
                </p>

                <h2>Teambuilder</h2>

                <p>
                    In the teambuilder you can build a pokemon team and save it to your profile (if you are logged in!)
                    to show other users your team, make sure to give it a cool name while you are at it!
                </p>

                <h2>Browse teams</h2>

                <p>
                    Here you can see other users teams and get inspiration for your next team! Give the ones you think are cool
                    a heart so the author of the team can see your appreciation!
                </p>

                <h2>Minigame</h2>

                <p>
                    The minigame will put your pokemon skills to the test, try to get on the highscore top 10 leaderboard
                    if you think you are good enough!
                </p>

                <h2>My teams</h2>

                <p>
                    Under profile (once you are logged in) you can see your saved teams and delete or edit them.
                </p>

                <h2>Credits</h2>

                <h3>August Wikdahl</h3>
                <p>Firebase and backend developer</p>

                <h3>Casper Johansson</h3>
                <p>Model and frontend developer</p>

                <h3>Alexander Larsson</h3>
                <p>Frontend developer</p>

                <h3>Filip Boive</h3>
                <p>Frontend developer</p>

            </div>
        </div>
    );
}
