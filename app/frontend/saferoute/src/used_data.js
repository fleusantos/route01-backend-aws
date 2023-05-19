import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import 'css/style.css';

const UsedData = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li style={{ textAlign: 'left', float: 'left' }}>
                        <a href="./map">SAFEROUTE</a>
                        </li>
                        <li className="navHover" style={{ textAlign: 'right' }}>
                        <a href="./map">Map</a>
                        </li>
                        <li className="navHover" style={{ textAlign: 'right' }}>
                        <a href="./about">About</a>
                        </li>
                        <li className="navHover" style={{ textAlign: 'right' }}>
                        <a className="navHover" href="./used_data">Used data</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div>
                <h1>Used Data</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor ultricies tortor, id commodo nisl varius ut.
                Nullam fringilla, risus non consequat semper, tortor dui placerat justo, vel condimentum nisi purus eu neque.
                Aliquam vitae est sed justo dapibus elementum. Phasellus vitae neque non purus blandit luctus. Donec dapibus sem a
                augue tincidunt consectetur. Integer maximus nisi tellus, ut auctor risus volutpat a. Nam non urna vitae ligula
                elementum facilisis. Nulla facilisi. Phasellus id congue felis, sit amet dignissim turpis. Curabitur vitae nisl
                lacus. Mauris finibus dignissim quam vel volutpat. Sed ullamcorper gravida magna id blandit.
                </p>
            </div>
        </div>
    );
};

export default withAuthenticator(UsedData, {
    socialProviders: ['google']
}); 