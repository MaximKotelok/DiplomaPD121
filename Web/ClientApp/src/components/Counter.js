import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}


/*import React, { Component } from 'react';
import { getArrayOfAnchors } from '../utils/Functions';
import { Description } from './Description';
export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  

  render() {
    return (
      <Description content="<div>
      <b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit. Donec metus ex, mollis non aliquam et, dapibus non metus. Aenean blandit est ligula, sit amet imperdiet dolor laoreet eget. Ut iaculis enim sed eros malesuada, in porta nulla fringilla. Mauris maximus, nisi ut blandit imperdiet, magna orci commodo lectus, ut vestibulum nisi metus at urna. Vivamus maximus purus urna, eget dapibus nulla iaculis non. Pellentesque in mi vel metus iaculis rhoncus. Nullam aliquam sodales blandit. Aenean fermentum nibh et vulputate vulputate. Maecenas metus massa, posuere eget finibus at, mollis eu sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur accumsan metus a odio hendrerit faucibus. Proin rutrum nulla ut facilisis finibus. Maecenas egestas tempus lacinia. In rutrum quam ac neque efficitur, at blandit augue lacinia.

      Ut quis tortor in metus ornare tristique et sit amet arcu. In id dolor porta, cursus eros a, facilisis augue. Ut malesuada elit sit amet velit porta, volutpat finibus lorem faucibus. Donec at metus pretium, accumsan dui non, dictum leo. Vivamus ligula neque, blandit at malesuada a, euismod mollis ante. Nunc pellentesque elit et nibh pretium, id malesuada leo pulvinar. Ut interdum efficitur sem. Nunc ornare dolor ac mauris ultrices, eget feugiat eros convallis. Maecenas sed gravida sem, eget pharetra ipsum. Sed eget elit at neque elementum sollicitudin ac sit amet leo. Fusce vitae tristique est, ut lobortis sapien. Praesent semper nisl quis leo faucibus dapibus. Quisque quis laoreet magna. Donec non libero in nibh pulvinar porttitor. Ut eros justo, cursus consectetur maximus quis, vulputate a nibh. Donec in tellus bibendum, volutpat urna et, auctor est.
      
      Aenean efficitur <b>magna</b> in euismod sodales. In vehicula, dui ac malesuada bibendum, metus diam consequat arcu, ut eleifend lectus nunc eu orci. Integer interdum auctor est et porttitor. Donec pharetra blandit nisl, vel egestas risus elementum quis. Integer molestie eu nunc venenatis vestibulum. Duis in odio condimentum, fringilla elit venenatis, tincidunt purus. Mauris a eleifend enim. Praesent aliquam tempor magna. Ut elit nisl, commodo nec nibh eget, cursus hendrerit ante.
      <b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit. Donec metus ex, mollis non aliquam et, dapibus non metus. Aenean blandit est ligula, sit amet imperdiet dolor laoreet eget. Ut iaculis enim sed eros malesuada, in porta nulla fringilla. Mauris maximus, nisi ut blandit imperdiet, magna orci commodo lectus, ut vestibulum nisi metus at urna. Vivamus maximus purus urna, eget dapibus nulla iaculis non. Pellentesque in mi vel metus iaculis rhoncus. Nullam aliquam sodales blandit. Aenean fermentum nibh et vulputate vulputate. Maecenas metus massa, posuere eget finibus at, mollis eu sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur accumsan metus a odio hendrerit faucibus. Proin rutrum nulla ut facilisis finibus. Maecenas egestas tempus lacinia. In rutrum quam ac neque efficitur, at blandit augue lacinia.

      Ut quis tortor in metus ornare tristique et sit amet arcu. In id dolor porta, cursus eros a, facilisis augue. Ut malesuada elit sit amet velit porta, volutpat finibus lorem faucibus. Donec at metus pretium, accumsan dui non, dictum leo. Vivamus ligula neque, blandit at malesuada a, euismod mollis ante. Nunc pellentesque elit et nibh pretium, id malesuada leo pulvinar. Ut interdum efficitur sem. Nunc ornare dolor ac mauris ultrices, eget feugiat eros convallis. Maecenas sed gravida sem, eget pharetra ipsum. Sed eget elit at neque elementum sollicitudin ac sit amet leo. Fusce vitae tristique est, ut lobortis sapien. Praesent semper nisl quis leo faucibus dapibus. Quisque quis laoreet magna. Donec non libero in nibh pulvinar porttitor. Ut eros justo, cursus consectetur maximus quis, vulputate a nibh. Donec in tellus bibendum, volutpat urna et, auctor est.
      
      Aenean efficitur <b>magna</b> in euismod sodales. In vehicula, dui ac malesuada bibendum, metus diam consequat arcu, ut eleifend lectus nunc eu orci. Integer interdum auctor est et porttitor. Donec pharetra blandit nisl, vel egestas risus elementum quis. Integer molestie eu nunc venenatis vestibulum. Duis in odio condimentum, fringilla elit venenatis, tincidunt purus. Mauris a eleifend enim. Praesent aliquam tempor magna. Ut elit nisl, commodo nec nibh eget, cursus hendrerit ante.

      <b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit. Donec metus ex, mollis non aliquam et, dapibus non metus. Aenean blandit est ligula, sit amet imperdiet dolor laoreet eget. Ut iaculis enim sed eros malesuada, in porta nulla fringilla. Mauris maximus, nisi ut blandit imperdiet, magna orci commodo lectus, ut vestibulum nisi metus at urna. Vivamus maximus purus urna, eget dapibus nulla iaculis non. Pellentesque in mi vel metus iaculis rhoncus. Nullam aliquam sodales blandit. Aenean fermentum nibh et vulputate vulputate. Maecenas metus massa, posuere eget finibus at, mollis eu sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur accumsan metus a odio hendrerit faucibus. Proin rutrum nulla ut facilisis finibus. Maecenas egestas tempus lacinia. In rutrum quam ac neque efficitur, at blandit augue lacinia.

      Ut quis tortor in metus ornare tristique et sit amet arcu. In id dolor porta, cursus eros a, facilisis augue. Ut malesuada elit sit amet velit porta, volutpat finibus lorem faucibus. Donec at metus pretium, accumsan dui non, dictum leo. Vivamus ligula neque, blandit at malesuada a, euismod mollis ante. Nunc pellentesque elit et nibh pretium, id malesuada leo pulvinar. Ut interdum efficitur sem. Nunc ornare dolor ac mauris ultrices, eget feugiat eros convallis. Maecenas sed gravida sem, eget pharetra ipsum. Sed eget elit at neque elementum sollicitudin ac sit amet leo. Fusce vitae tristique est, ut lobortis sapien. Praesent semper nisl quis leo faucibus dapibus. Quisque quis laoreet magna. Donec non libero in nibh pulvinar porttitor. Ut eros justo, cursus consectetur maximus quis, vulputate a nibh. Donec in tellus bibendum, volutpat urna et, auctor est.
      
      Aenean efficitur <b>magna</b> in euismod sodales. In vehicula, dui ac malesuada bibendum, metus diam consequat arcu, ut eleifend lectus nunc eu orci. Integer interdum auctor est et porttitor. Donec pharetra blandit nisl, vel egestas risus elementum quis. Integer molestie eu nunc venenatis vestibulum. Duis in odio condimentum, fringilla elit venenatis, tincidunt purus. Mauris a eleifend enim. Praesent aliquam tempor magna. Ut elit nisl, commodo nec nibh eget, cursus hendrerit ante.
      <b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit. Donec metus ex, mollis non aliquam et, dapibus non metus. Aenean blandit est ligula, sit amet imperdiet dolor laoreet eget. Ut iaculis enim sed eros malesuada, in porta nulla fringilla. Mauris maximus, nisi ut blandit imperdiet, magna orci commodo lectus, ut vestibulum nisi metus at urna. Vivamus maximus purus urna, eget dapibus nulla iaculis non. Pellentesque in mi vel metus iaculis rhoncus. Nullam aliquam sodales blandit. Aenean fermentum nibh et vulputate vulputate. Maecenas metus massa, posuere eget finibus at, mollis eu sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur accumsan metus a odio hendrerit faucibus. Proin rutrum nulla ut facilisis finibus. Maecenas egestas tempus lacinia. In rutrum quam ac neque efficitur, at blandit augue lacinia.

      Ut quis tortor in metus ornare tristique et sit amet arcu. In id dolor porta, cursus eros a, facilisis augue. Ut malesuada elit sit amet velit porta, volutpat finibus lorem faucibus. Donec at metus pretium, accumsan dui non, dictum leo. Vivamus ligula neque, blandit at malesuada a, euismod mollis ante. Nunc pellentesque elit et nibh pretium, id malesuada leo pulvinar. Ut interdum efficitur sem. Nunc ornare dolor ac mauris ultrices, eget feugiat eros convallis. Maecenas sed gravida sem, eget pharetra ipsum. Sed eget elit at neque elementum sollicitudin ac sit amet leo. Fusce vitae tristique est, ut lobortis sapien. Praesent semper nisl quis leo faucibus dapibus. Quisque quis laoreet magna. Donec non libero in nibh pulvinar porttitor. Ut eros justo, cursus consectetur maximus quis, vulputate a nibh. Donec in tellus bibendum, volutpat urna et, auctor est.
      
      Aenean efficitur <b>magna</b> in euismod sodales. In vehicula, dui ac malesuada bibendum, metus diam consequat arcu, ut eleifend lectus nunc eu orci. Integer interdum auctor est et porttitor. Donec pharetra blandit nisl, vel egestas risus elementum quis. Integer molestie eu nunc venenatis vestibulum. Duis in odio condimentum, fringilla elit venenatis, tincidunt purus. Mauris a eleifend enim. Praesent aliquam tempor magna. Ut elit nisl, commodo nec nibh eget, cursus hendrerit ante.
    </div>"></Description>
    );
  }
}
*/