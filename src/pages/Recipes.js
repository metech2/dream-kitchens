import PreviousSearches from "../components/PreviousSeaches"
import RecipeCard from "../components/RecipeCard"

export default function Recipes(){
    const recipes = [
        {
            title: "Vegan Rice Bowl",
            image: "/img/img_1.jpg",
        },
        {
            title: "Air Fryer Honey Garlic Salmon",
            image: "/img/img_2.jpg",
        },
        {
            title: "Banana Panecake Cereal",
            image: "/img/img_3.jpg",
        },
        {
            title: "Shirmp Salad with Avocado",
            image: "/img/img_5.jpg",
        },
        {
            title: "Chicken Tacos",
            image: "/img/img_6.jpg",
        },
        {
            title: "Brownie",
            image: "/img/img_8.jpg",
        },
        {
            title: "Cucumber Salad",
            image: "/img/img_9.jpg",
        }
    ]
    
    return(
        <div>
            <PreviousSearches/>
            <div className="recipes-container">
                {/*<RecipeCard/> */}
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}