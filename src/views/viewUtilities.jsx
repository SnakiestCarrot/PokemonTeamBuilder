export function renderTypeImage(typeId) {
    return (
        <img
            key={typeId}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`}
            alt={`Type ${typeId}`}
        />
    )
}
