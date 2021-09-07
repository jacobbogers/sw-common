import type { Recipe } from '$lib/dao/Recipe';

export function recipesToPlainObj(recipes: Recipe[], ...props: string[]): unknown {
    const actual = [];

    if (props.length === 0){
        props = ['name:name', 'recipe_id:id'];
    }

    for (const recipe of recipes) {
        const rcR = { ingredients: [] };
        for (const prop of props){
            const [dest, src] = prop.split(':');
            rcR[dest] = recipe[src];
        }
        actual.push(rcR);
        for (const ingr of recipe.ingredients) {
            rcR.ingredients.push({ state: 1, pk: ingr.id, name: ingr.name });
        }
    }
    return actual;
}