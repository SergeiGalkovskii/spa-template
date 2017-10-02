import { ApiClient, ExampleDto } from "api";
import autobind from "autobind-decorator";
import { CodeSample } from "components";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Button, Col, Nav, Row } from "reactstrap";
import { connect } from "store";
import { ExampleApiState, GetServerTime, RefreshServerTime } from "store/example";

interface ApiExamplePageProps {
    apiState?: ExampleApiState;
}

interface ApiExamplePageDispatch {
    load: () => void;
    refresh: () => void;
}

@connect<ApiExamplePageProps, ApiExamplePageDispatch>(
    state => ({
        apiState: state.exampleApi
    }),
    dispatch => ({
        load: () => dispatch(GetServerTime()),
        refresh: () => dispatch(RefreshServerTime()),
    }),
)
export class ApiExamplePage extends React.Component<ApiExamplePageProps & ApiExamplePageDispatch> {
    public componentWillMount() {
        this.props.load();
    }

    public render(): JSX.Element {
        const {
            apiState,
        } = this.props;

        const apiOutput = !apiState.isProcessing && apiState.result
            ? <p>{apiState.result.message}<br />{apiState.result.currentServerTime.format("HH:mm a")}</p>
            : "loading...";

        return (
            <div>
                <Helmet>
                    <title>Spa-Template - Api Example Page</title>
                </Helmet>
                <div className="mb-4">
                    <Button onClick={this.onRefresh} color="primary">Refresh</Button>
                </div>
                <Row>
                    <Col sm={3}>
                        <h4>Output</h4>
                        <samp>
                            {apiOutput}
                        </samp>
                    </Col>
                    <Col sm={9}>
                        <h4>Redux Automata</h4>
                        <CodeSample />
                    </Col>
                </Row>
            </div>
        );
    }

    @autobind
    private onRefresh(e: React.SyntheticEvent<HTMLAnchorElement>): void {
        e.preventDefault();
        this.props.refresh();
    }
}
