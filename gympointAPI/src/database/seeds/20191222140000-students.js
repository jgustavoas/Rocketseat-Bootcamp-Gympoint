module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        { name: "Aldo Moura", age: 24, email: "aldomoura@email.com", weight: 77, height: 191, created_at: new Date(), updated_at: new Date(), },
        { name: "Angelina Laranjeira", age: 45, email: "angelinalaranjeira@email.com", weight: 61, height: 181, created_at: new Date(), updated_at: new Date(), },
        { name: "António Carvalhoso", age: 48, email: "antóniocarvalhoso@email.com", weight: 80, height: 190, created_at: new Date(), updated_at: new Date(), },
        { name: "Bernardo Guimaraes", age: 27, email: "bernardoguimaraes@email.com", weight: 70, height: 184, created_at: new Date(), updated_at: new Date(), },
        { name: "Carolina Monsanto", age: 45, email: "carolinamonsanto@email.com", weight: 62, height: 166, created_at: new Date(), updated_at: new Date(), },
        { name: "Davi Carreira", age: 20, email: "davicarreira@email.com", weight: 76, height: 171, created_at: new Date(), updated_at: new Date(), },
        { name: "Diana Lancastre", age: 33, email: "dianalancastre@email.com", weight: 83, height: 181, created_at: new Date(), updated_at: new Date(), },
        { name: "Diógenes Silva", age: 36, email: "diogenessilva@email.com", weight: 75, height: 194, created_at: new Date(), updated_at: new Date(), },
        { name: "Diogo Alcántara", age: 36, email: "diogoalcántara@email.com", weight: 77, height: 185, created_at: new Date(), updated_at: new Date(), },
        { name: "Emídio Borba", age: 25, email: "emidioborba@email.com", weight: 59, height: 183, created_at: new Date(), updated_at: new Date(), },
        { name: "Ermelinda Jatobá", age: 40, email: "ermelindajatobá@email.com", weight: 68, height: 186, created_at: new Date(), updated_at: new Date(), },
        { name: "Ildefonso Aldea", age: 55, email: "ildefonsoaldea@email.com", weight: 55, height: 166, created_at: new Date(), updated_at: new Date(), },
        { name: "Justino Gonçalves", age: 25, email: "justinogonçalves@email.com", weight: 84, height: 181, created_at: new Date(), updated_at: new Date(), },
        { name: "Liliana Marreiro", age: 25, email: "lilianamarreiro@email.com", weight: 57, height: 185, created_at: new Date(), updated_at: new Date(), },
        { name: "Marli Cabreira", age: 49, email: "marlicabreira@email.com", weight: 75, height: 167, created_at: new Date(), updated_at: new Date(), },
        { name: "Rogério Borba", age: 27, email: "rogerioborba@email.com", weight: 55, height: 178, created_at: new Date(), updated_at: new Date(), },
        { name: "Ronaldo Cachoeira", age: 53, email: "ronaldocachoeira@email.com", weight: 68, height: 176, created_at: new Date(), updated_at: new Date(), },
        { name: "Simone Melo", age: 27, email: "simonemelo@email.com", weight: 55, height: 195, created_at: new Date(), updated_at: new Date(), },
        { name: "Teresina Casqueira", age: 50, email: "teresinacasqueira@email.com", weight: 75, height: 191, created_at: new Date(), updated_at: new Date(), },
        { name: "Timóteo Fraga", age: 38, email: "timoteofraga@email.com", weight: 81, height: 184, created_at: new Date(), updated_at: new Date(), },
      ],
      {}
    );
  },

  down: () => { },
};
