import PubSub from 'pubsub-js';

export default class PubError {

	publish(topic, errors){	
		for (var i = 0; i < errors.length; i++) {
			PubSub.publish(topic, errors[i]);
		}	
	}
}