import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class GitHubService {
  constructor(private apiService: ApiService) {}

  /**
   * @method getRepoCommit
   * @param username GitHub username.
   * @param repo GitHub repository name.
   * @description Returns Commit list of user's repository.
   * @return An Observable of the response body as a JSON object.
   */
  getRepoCommit(username: String, repo: String) {
    return this.apiService.get(
      `https://api.github.com/repos/${username}/${repo}/commits`
    );
  }
}
