export function getName({ isArena, isNightShow, name }) {
  if (!isArena) return name;
  if (isNightShow)
    return 'Романтическое ночное шоу';
  else
    return 'Дневное шоу';
}