import React, { useState } from 'react';

import './SearchComponent.css';

const SearchComponent = ({searchTitle}) => {
    <div className='container'>
        <div className='row'>
            <span>{searchTitle}</span>

            <div class="p-1 bg-light shadow-sm mb-4">
            <div class="input-group">
              <div class="input-group-prepend">
                <button id="button-addon2" type="submit" class="btn btn-link text-warning"><i class="fa fa-search"></i></button>
              </div>
              <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon2" class="form-control border-0 bg-light"/>
            </div>
          </div>
        </div>
    </div>

}
     

export default SearchComponent;
