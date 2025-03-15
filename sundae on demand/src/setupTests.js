import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => server.listen()); //establishing the api mocking and it ill come before all test
afterEach(() => server.resetHandlers()); // reset all handlers
afterAll(() => server.close()); // cleanup after all the tests
