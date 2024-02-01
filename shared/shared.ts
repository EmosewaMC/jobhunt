export class Message {
  constructor(public messageName: string = "") {}
  deserialize(response: any) {
    return response["message"] === this.messageName;
  }
  serialize(response: any) {
    response["message"] = this.messageName;
  }
}

export class GetPosition extends Message {
  constructor(public x: number = 0, public y: number = 0) {
    super("GetPosition");
  }
  deserialize(response: any) {
    if (!super.deserialize(response)) return false;
    if (response["position"] === undefined) return false;
    if (response["position"]["x"] === undefined) return false;
    if (response["position"]["y"] === undefined) return false;
    this.x = response["position"]["x"];
    this.y = response["position"]["y"];
    return true;
  }

  serialize(response: any) {
    super.serialize(response);
    response["position"] = { x: this.x, y: this.y };
  }
}

export class SetPosition extends Message {
  constructor(public x: number = 0, public y: number = 0) {
    super("SetPosition");
  }

  deserialize(response: any) {
    if (!super.deserialize(response)) return false;
    if (response["position"] === undefined) return false;
    if (response["position"]["x"] === undefined) return false;
    if (response["position"]["y"] === undefined) return false;
    this.x = response["position"]["x"];
    this.y = response["position"]["y"];
    return true;
  }

  serialize(response: any) {
    super.serialize(response);
    response["position"] = { x: this.x, y: this.y };
  }
}
