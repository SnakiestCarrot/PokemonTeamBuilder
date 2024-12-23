export function MainView(props) {
    
    const mainImageUrl = "https://cdn.discordapp.com/attachments/1310554884105441357/1320485856938823732/pokeymang.png?ex=676a6e89&is=67691d09&hm=f84e7b63907cc9eae2fc55a6c0ff5842b9c925d7a6055b241f473a76502acba5&";

    return (
        <div>
            <div className="main-screen-image-container">
                <img className="main-screen-image" src={mainImageUrl} alt="Team builder main image" />
            </div>
            <div className="main-screen-text-container">
                <h2>Intro</h2>
                <p>
                    This website is made to be able to build your own pokemon teams, learn more about pokemon and their types
                    and 

                </p>
            </div>
        </div>
    );
}
