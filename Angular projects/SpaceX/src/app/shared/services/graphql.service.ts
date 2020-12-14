import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Scalars = {
  ID: string;
  Int: number;
};

export const ShipDetailsDocument = gql`
  query ship($id: ID!) {
    ship(id: $id) {
      home_port
      name
      missions {
        flight
        name
      }
      weight_kg
      weight_lbs
      year_built
      type
      active
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ShipDetailsGQL extends Apollo.Query<any> {
  document = ShipDetailsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const ShipsDocument = gql`
  query ships($limit: Int!) {
    ships(limit: $limit) {
      id
      image
      name
      weight_kg
      weight_lbs
      year_built
      home_port
      type
      missions {
        flight
        name
      }
      active
      roles
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ShipsGQL extends Apollo.Query<any> {
  document = ShipsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const TotalCountDocument = gql`
  query shipsResult {
    shipsResult {
      result {
        totalCount
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TotalCountGQL extends Apollo.Query<any> {
  document = TotalCountDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
``