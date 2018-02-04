import * as pg from 'pg';
import { ColumnWrapper } from '../columns';
import { DeleteQuery, InsertQuery, PartialQuery, SelectQuery, UpdateQuery } from '../query';
import { TableWrapper } from '../table';
import { CollectionToken, ParameterToken, SeparatorToken, StringToken } from '../tokens';

// FIXME: any should be replaced by something specific. But specifying Table, which should be the
// right type, breaks functionality. Table adds an index signature which means doing keyof MyTable
// (which extends from Table) returns string instead a type with all keys.
export interface TableMap { [tableName: string]: any }

export abstract class Database<Tables extends TableMap> {
  protected tables: Tables;

  constructor(tables: Tables) {
    this.tables = tables;
  }

  getTableNames() {
    return Object.keys(this.tables);
  }

  sql(strings: TemplateStringsArray, ...parameters: any[]) {
    const text = strings.reduce((query, string, index) => query + string + (index < parameters.length
      ? `$${String(index + 1)}`
      : ``), ``);

    // FIXME: this returns a pg.QueryResult which has `any[]` as type of the rows. This is
    // less than ideal. Ideally it's passed as a type so we avoid any.
    return this.exec(text, parameters);
  }

  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] }
    )>(
      columnA: A,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    B extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] } &
      { [P in B['name']]: B['selectType'] }
    )>(
      columnA: A,
      columnB: B,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    B extends ColumnWrapper<any, any, any, any, any>,
    C extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] } &
      { [P in B['name']]: B['selectType'] } &
      { [P in C['name']]: C['selectType'] }
    )>(
      columnA: A,
      columnB: B,
      columnC: C,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    B extends ColumnWrapper<any, any, any, any, any>,
    C extends ColumnWrapper<any, any, any, any, any>,
    D extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] } &
      { [P in B['name']]: B['selectType'] } &
      { [P in C['name']]: C['selectType'] } &
      { [P in D['name']]: D['selectType'] }
    )>(
      columnA: A,
      columnB: B,
      columnC: C,
      columnD: D,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    B extends ColumnWrapper<any, any, any, any, any>,
    C extends ColumnWrapper<any, any, any, any, any>,
    D extends ColumnWrapper<any, any, any, any, any>,
    E extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] } &
      { [P in B['name']]: B['selectType'] } &
      { [P in C['name']]: C['selectType'] } &
      { [P in D['name']]: D['selectType'] } &
      { [P in E['name']]: E['selectType'] }
    )>(
      columnA: A,
      columnB: B,
      columnC: C,
      columnD: D,
      columnE: E,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    B extends ColumnWrapper<any, any, any, any, any>,
    C extends ColumnWrapper<any, any, any, any, any>,
    D extends ColumnWrapper<any, any, any, any, any>,
    E extends ColumnWrapper<any, any, any, any, any>,
    F extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] } &
      { [P in B['name']]: B['selectType'] } &
      { [P in C['name']]: C['selectType'] } &
      { [P in D['name']]: D['selectType'] } &
      { [P in E['name']]: E['selectType'] } &
      { [P in F['name']]: F['selectType'] }
    )>(
      columnA: A,
      columnB: B,
      columnC: C,
      columnD: D,
      columnE: E,
      columnF: F,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    B extends ColumnWrapper<any, any, any, any, any>,
    C extends ColumnWrapper<any, any, any, any, any>,
    D extends ColumnWrapper<any, any, any, any, any>,
    E extends ColumnWrapper<any, any, any, any, any>,
    F extends ColumnWrapper<any, any, any, any, any>,
    G extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] } &
      { [P in B['name']]: B['selectType'] } &
      { [P in C['name']]: C['selectType'] } &
      { [P in D['name']]: D['selectType'] } &
      { [P in E['name']]: E['selectType'] } &
      { [P in F['name']]: F['selectType'] } &
      { [P in G['name']]: G['selectType'] }
    )>(
      columnA: A,
      columnB: B,
      columnC: C,
      columnD: D,
      columnE: E,
      columnF: F,
      columnG: G,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select<
    A extends ColumnWrapper<any, any, any, any, any>,
    B extends ColumnWrapper<any, any, any, any, any>,
    C extends ColumnWrapper<any, any, any, any, any>,
    D extends ColumnWrapper<any, any, any, any, any>,
    E extends ColumnWrapper<any, any, any, any, any>,
    F extends ColumnWrapper<any, any, any, any, any>,
    G extends ColumnWrapper<any, any, any, any, any>,
    H extends ColumnWrapper<any, any, any, any, any>,
    Ret = (
      { [P in A['name']]: A['selectType'] } &
      { [P in B['name']]: B['selectType'] } &
      { [P in C['name']]: C['selectType'] } &
      { [P in D['name']]: D['selectType'] } &
      { [P in E['name']]: E['selectType'] } &
      { [P in F['name']]: F['selectType'] } &
      { [P in G['name']]: G['selectType'] } &
      { [P in H['name']]: H['selectType'] }
    )>(
      columnA: A,
      columnB: B,
      columnC: C,
      columnD: D,
      columnE: E,
      columnF: F,
      columnG: G,
      columnH: H,
    ): SelectQuery<this, {}, {}, {}, Ret[], Ret>;
  select(...columns: ColumnWrapper<any, any, any, any, any>[]) {

    const columnsMap = columns.reduce((map, column) => ({
      ...map,
      [column.getSnakeCaseName()]: column.getCamelCaseName(),
    }), {});

    return new SelectQuery(this, columnsMap, new StringToken(`SELECT`), new SeparatorToken(`,`, columns
      .filter(column => Boolean(column))
      .map(column => new CollectionToken(column!.toTokens()))));
  }

  insertInto<T extends TableWrapper<any, any, any>>(table: T): InsertQuery<this, T, T['$row'], T['$insertRow'], T['$updateRow'], number, void> {
    return new InsertQuery(this, table, new StringToken(`INSERT INTO`), new StringToken(table.getName()));
  }

  deleteFrom<T extends TableWrapper<any, any, any>>(table: T): DeleteQuery<this, T, T['$row'], T['$insertRow'], T['$updateRow'], number, void> {
    return new DeleteQuery(this, table, new StringToken(`DELETE FROM`), new StringToken(table.getName()));
  }

  update<T extends TableWrapper<any, any, any>, Ret = UpdateQuery<this, T, T['$row'], T['$insertRow'], T['$updateRow'], number, void>>(table: T): { set(object: { [P in keyof T['$updateRow']]?: T['$updateRow'][P] | PartialQuery }): Ret } {
    const getColumn = (key: string): ColumnWrapper<any, any, any, any, any> | undefined => (table as any)[key];

    return {
      set: (object: { [P in keyof T['$updateRow']]?: T['$updateRow'][P] | PartialQuery }): Ret => {
        const keys = Object.keys(object) as (keyof T['$row'])[];

        return new UpdateQuery(
          this,
          table,
          new StringToken(`UPDATE`),
          new StringToken(table.getName()),
          new StringToken(`SET`),
          new SeparatorToken(`,`,
            keys
              .map(columnName => getColumn(columnName))
              .filter(column => Boolean(column))
              .map(column => {
                const value = (object as any)[column!.camelCaseName];

                return value && value.toTokens
                  ? new CollectionToken([
                    new StringToken(column!.snakeCaseName!),
                    new StringToken(`=`),
                    ...value.toTokens(),
                  ])
                  : new CollectionToken([
                    new StringToken(column!.snakeCaseName!),
                    new StringToken(`=`),
                    new ParameterToken(value),
                  ]);
              }),
          )) as any;
      },
    };
  }

  abstract async exec(text: string, parameters: any[]): Promise<pg.QueryResult>;
  abstract async destroy(): Promise<void>;
  abstract async transaction<Ret, State = {
    [TableName in keyof Tables]: TableWrapper<{
      [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['selectType'];
    }, {
      [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['insertType'];
    }, {
      [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['updateType'];
    }> & {
      [ColumnName in keyof Tables[TableName]]: ColumnWrapper<
        ColumnName,
        Tables[TableName][ColumnName]['type'],
        Tables[TableName][ColumnName]['selectType'],
        Tables[TableName][ColumnName]['insertType'],
        Tables[TableName][ColumnName]['updateType']
      >
    }
  }>(callback: (db: Database<Tables> & State) => Promise<Ret>): Promise<Ret | undefined>;
}