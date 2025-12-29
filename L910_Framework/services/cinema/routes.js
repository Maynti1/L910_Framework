import { loadData, saveData, generateId } from './data.js';

let movies = loadData('movies.json');
let tickets = loadData('tickets.json');

export const setupCinemaRoutes = (app) => {
  
  app.get('/cinema/movies', (req, res) => {
    res.json(movies);
  });

  app.get('/cinema/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Фильм не найден' });
    }
  });

  app.post('/cinema/movies', (req, res) => {
    const newMovie = {
      id: generateId(),
      ...req.body,
      inCinema: true,
      showtimes: req.body.showtimes|| []
    };
    
    if (!newMovie.title || !newMovie.genre) {
      return res.status(400).json({ 
        error: 'Название и жанр фильма обязательны' 
      });
    }
    
    movies.push(newMovie);
    
    if (saveData('movies.json', movies)) {
      res.status(201).json(newMovie);
    } else {
      res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
  });

  app.put('/cinema/movies/:id', (req, res) => {
    const index = movies.findIndex(m => m.id === req.params.id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...req.body };
      
      if (saveData('movies.json', movies)) {
        res.json(movies[index]);
      } else {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
      }
    } else {
      res.status(404).json({ error: 'Фильм не найден' });
    }
  });

  app.patch('/cinema/movies/:id', (req, res) => {
    const index = movies.findIndex(m => m.id === req.params.id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...req.body };
      
      if (saveData('movies.json', movies)) {
        res.json(movies[index]);
      } else {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
      }
    } else {
      res.status(404).json({ error: 'Фильм не найден' });
    }
  });

  app.delete('/cinema/movies/:id', (req, res) => {
    const index = movies.findIndex(m => m.id === req.params.id);
    if (index !== -1) {
      const deletedMovie = movies.splice(index, 1)[0];
      
      tickets = tickets.filter(t => t.movieId !== req.params.id);
      saveData('tickets.json', tickets);
      
      if (saveData('movies.json', movies)) {
        res.json({ 
          message: 'Фильм удален',
          movie: deletedMovie 
        });
      } else {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
      }
    } else {
      res.status(404).json({ error: 'Фильм не найден' });
    }
  });

  
  app.get('/cinema/tickets', (req, res) => {
    res.json(tickets);
  });

  app.get('/cinema/tickets/:id', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Билет не найден' });
    }
  });

  app.post('/cinema/tickets', (req, res) => {
    const newTicket = {
      id: generateId(),
      ...req.body,
      isSold: true,
      purchaseDate: new Date().toISOString()
    };
    
    const movieExists = movies.some(m => m.id === newTicket.movieId);
    if (!movieExists) {
      return res.status(400).json({ 
        error: 'Фильм с таким ID не существует' 
      });
    }
    
    if (!newTicket.movieId|| !newTicket.seat || !newTicket.customer) {
      return res.status(400).json({ 
        error: 'ID фильма, место и имя покупателя обязательны' 
      });
    }

    tickets.push(newTicket);
    
    if (saveData('tickets.json', tickets)) {
      res.status(201).json(newTicket);
    } else {
      res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
  });

  app.put('/cinema/tickets/:id', (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
      tickets[index] = { ...tickets[index], ...req.body };
      
      if (saveData('tickets.json', tickets)) {
        res.json(tickets[index]);
      } else {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
      }
    } else {
      res.status(404).json({ error: 'Билет не найден' });
    }
  });

  app.patch('/cinema/tickets/:id', (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
      tickets[index] = { ...tickets[index], ...req.body };
      
      if (saveData('tickets.json', tickets)) {
        res.json(tickets[index]);
      } else {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
      }
    } else {
      res.status(404).json({ error: 'Билет не найден' });
    }
  });

  app.delete('/cinema/tickets/:id', (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
      const deletedTicket = tickets.splice(index, 1)[0];
      
      if (saveData('tickets.json', tickets)) {
        res.json({ 
          message: 'Билет удален',
          ticket: deletedTicket 
        });
      } else {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
      }
    } else {
      res.status(404).json({ error: 'Билет не найден' });
    }
  });

  app.get('/cinema/movies/:id/tickets', (req, res) => {
    const movieTickets = tickets.filter(t => t.movieId === req.params.id);
    res.json(movieTickets);
  });
  app.get('/cinema/available-tickets', (req, res) => {
    const availableTickets = tickets.filter(t => !t.isSold);
    res.json(availableTickets);
  });
};