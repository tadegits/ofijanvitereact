import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PostList } from './PostList';
import { PostCreate} from './PostCreate';

class Blog extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(data => this.setState({ posts: data }));
    }

    render() {
        return (
            <div>
                <h1>My Blog</h1>
                <Switch>
                    <Route path="/posts">
                        <PostList posts={this.state.posts} />
                    </Route>
                    <Route path="/posts/new">
                        <PostCreate />
                    </Route>
                </Switch>
            </div>
        );
    }
}
export default Blog