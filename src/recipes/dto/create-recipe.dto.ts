export class CreateRecipeDto {
  recipe_id: number;
  recipe_name: string;
  description: string;
  instruction: string;
  photo_path: string;
  date_created: Date;
}
