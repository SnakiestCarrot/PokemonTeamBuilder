import "../styles.css"

export function MainView (props) {
    return (
        <div>
            <p className="debug-title">Main page</p>
            <button onClick={userWantsToSwitchToSearchPage}>Go to search page</button>
        </div>
    )

    function userWantsToSwitchToSearchPage () {
       props.changeToSearchPage()
    }

}