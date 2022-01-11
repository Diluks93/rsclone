export const getTranslationJson = async (url: string) => {
  try {
    const translationData = await fetch(url);
    const translationJson = await translationData.json();
    return translationJson;
  } catch (e) {
    console.error(e);
  }
};
