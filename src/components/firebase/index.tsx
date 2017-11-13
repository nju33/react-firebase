import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as firebase from 'firebase/app';

export class Firebase extends React.Component<Firebase.Config, Firebase.State> {
  static childContextTypes = {
    firebase: PropTypes.object,
  };

  public getChildContext() {
    return {firebase};
  }

  constructor(props: Firebase.Config) {
    super(props);
    this.state = {
      inited: false,
    };
  }

  public async componentDidMount() {
    if (firebase.apps.length > 0) {
      this.setState({inited: true});
      return;
    }

    const config: Firebase.Config = {
      apiKey: this.props.apiKey,
    };
    if (this.props.projectId !== undefined) {
      config.projectId = this.props.projectId;
      await import('firebase/firestore');
    }
    if (this.props.authDomain !== undefined) {
      config.authDomain = this.props.authDomain;
      await import('firebase/auth');
    }
    if (this.props.databaseURL !== undefined) {
      config.databaseURL = this.props.databaseURL;
      await import('firebase/database');
    }
    if (this.props.storageBucket !== undefined) {
      config.storageBucket = this.props.storageBucket;
      await import('firebase/storage');
    }
    if (this.props.messagingSenderId !== undefined) {
      config.messagingSenderId = this.props.messagingSenderId;
      await import('firebase/messaging');
    }
    firebase.initializeApp(config);
    this.setState({inited: true});
  }

  public render() {
    if (this.state.inited) {
      return <div className="firebase">{this.props.children}</div>;
    }

    return <div className="firebase" />;
  }
}

export namespace Firebase {
  export interface Config {
    readonly apiKey: string;
    projectId?: string;
    authDomain?: string;
    databaseURL?: string;
    storageBucket?: string;
    messagingSenderId?: string;
  }

  export interface State {
    inited: boolean;
  }
}
