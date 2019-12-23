import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import MatrciculationController from './app/controllers/MatriculationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import MyHelpOrderController from './app/controllers/MyHelpOrderController';
import MyMatrciculationController from './app/controllers/MyMatriculationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('Hello Gympoint');
});

/**
 * Checkins e pedidos de ajuda são inseridos logo aqui em cima porque são feitos por alunos
 * e não requer middleware de autenticação
 *  */
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/my-help-orders', MyHelpOrderController.index);
routes.post('/students/:id/my-help-orders', MyHelpOrderController.store);
routes.get('/students/:id/my-help-orders/:hId', MyHelpOrderController.read);

// Rota para acesso do aluno pelo aplicativo móvel
routes.post('/signin', MyMatrciculationController.signin);

routes.post('/sessions', SessionController.store);

// Como middleare global, coloca-se o middleware criado dentro de routes.use()
// Esse middleware "global" só vai funcionar para as rotas nas linhas abaixo dele
routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.select);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.select);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans', PlanController.delete);

routes.get('/matriculations', MatrciculationController.index);
routes.get('/matriculations/:id', MatrciculationController.select);
routes.post('/matriculations', MatrciculationController.store);
routes.put('/matriculations/:id', MatrciculationController.update);
routes.delete('/matriculations', MatrciculationController.delete);

// Apenas usuários da academia logados podem acessar pedidos de ajuda
routes.get('/help-orders', HelpOrderController.index);
routes.get('/students/:id/help-orders', HelpOrderController.select);
routes.get('/help-orders/:id', HelpOrderController.read);
routes.put('/help-orders/:id', HelpOrderController.reply);

export default routes;
