import * as React from 'react';
import * as PropTypes from 'prop-types';
import {render} from 'react-dom';
import * as firebase from 'firebase/app';
import {Firebase} from 'components/firebase';

const div = document.createElement('div');
document.body.appendChild(div);

class Main extends React.Component {
  static contextTypes = {
    firebase: PropTypes.object,
  };

  public async componentWillMount() {
    const db = this.context.firebase.firestore();
    const snapshot = await db.collection('users').get();
    snapshot.docs.map((doc: {data(): object}) => console.log(doc.data()));
  }

  public render() {
    return <div>children</div>;
  }
}

render(
  <div>
    <Firebase
      apiKey="AIzaSyBnvDDDmniFTwB8-GC3VUlWWhpfVigZ3f0"
      projectId="nju333333"
      authDomain="nju333333.firebaseapp.com"
    >
      <Main />
    </Firebase>
  </div>,
  div,
);
