import {StackActions, CommonActions} from '@react-navigation/native';

/*
  Router only generates navigation actions (plain js objects).
  The actual navigation is done using the Navigator ref, by dispatching those actions.
*/
const Router = {
  /**
   * Need to remove/replace this. Its not available in react navigation v5.
   */

  goTo: (navigation: any, routeName: any, params: object) =>
    navigation.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    ), // return CommonActions.navigate({ routeName, params });

  resetNew: (navigation: any, routeName: any, params: object) =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routeName, params}],
      }),
    ), // return CommonActions.navigate({ routeName, params });
  pop: (n: number = 1) => StackActions.pop(n),

  popToTop: () => StackActions.popToTop(),
};

export default Router;
