import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';


class Home extends React.Component{
  

  state = {
    isLoading : true,
    movies : [],
  };

  getMovies = async() =>{
    const { 
      data:{
        data:{ movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    console.log(movies)
    this.setState({ movies, isLoading:false }) // key 와 변수가 같다면 축약할수 있다 this.setState({ movies:movies })
  }


  componentDidMount(){
    this.getMovies();
  }

  render(){
    const { isLoading, movies } = this.state; // 구조 분해 할당
    return (
      <section className = "container">
        { 
          isLoading ? (
            <div className = "lader">
              <span className = "loader__text">Loading...</span>
            </div>
          ): (
            <div className = "movies">
              {movies.map(movie =>
                  (
                  <Movie 
                    key = { movie.id }
                    id = { movie.id }
                    year = { movie.year }
                    title = { movie.title }
                    summary = { movie.summary }
                    poster = { movie.medium_cover_image }
                    genres = { movie.genres }
                    />
                  )
                )}
            </div>
            )
        }
      </section>
    );// 삼항 연산자
  }

}

export default Home;
