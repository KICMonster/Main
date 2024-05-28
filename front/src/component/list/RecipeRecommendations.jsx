import { Link } from "react-router-dom";
const craft = [[]];
function RecipeRecommendations() {
    return (
        <aside>
            <div className="CraftListHaeader"><h3 >믹솔로지 배워보기</h3></div>
            <div className="CraftList">
                {craft.map((recipe) => (
                    <Link to={`/cocktail/${recipe.name}`} key={recipe.name}>
                        <article className="CraftListArticle">
                            <img src={recipe.img} />
                            <h4>{recipe.title}</h4>
                        </article>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
export default RecipeRecommendations;