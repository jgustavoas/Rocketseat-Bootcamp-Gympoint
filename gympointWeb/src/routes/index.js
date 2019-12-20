import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '../pages/Students';
import StudentsForm from '../pages/Students/form';
import Matriculations from '../pages/Matriculations';
import MatriculationsForm from '../pages/Matriculations/form';
import Plans from '../pages/Plans';
import PlansForm from '../pages/Plans/form';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={SignIn} />
      <Route path='/students' component={Students} isPrivate />
      <Route path='/studentsform' component={StudentsForm} isPrivate />
      <Route path='/matriculations' component={Matriculations} isPrivate />
      <Route
        path='/matriculationsform'
        component={MatriculationsForm}
        isPrivate
      />
      <Route path='/plans' component={Plans} isPrivate />
      <Route path='/plansform' component={PlansForm} isPrivate />
      <Route path='/helporders' component={HelpOrders} isPrivate />

      <Route path='/notfound' component={() => <h1>404</h1>} />
    </Switch>
  );
}
