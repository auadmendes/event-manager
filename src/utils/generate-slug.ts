export function generateSlug(text: string): string {
    return text
      .toLowerCase() // Converte o texto para minúsculas
      .normalize('NFD') // Normaliza o texto em forma de decomposição
      .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais, exceto espaços e hifens
      .trim() // Remove espaços em branco do início e do final
      .replace(/\s+/g, '-') // Substitui espaços por hifens
      .replace(/-+/g, '-'); // Remove hifens duplicados
  }
  