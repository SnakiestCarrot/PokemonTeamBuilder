
import "../styles.css"

export function renderTypeImage(typeId) {
    return (
        <img
            key={typeId}
            className="pokemon-type-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/${typeId}.png`}
            alt={`Type ${typeId}`}
        />
    )
}


